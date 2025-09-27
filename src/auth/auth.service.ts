import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ name, email, password: hashedPassword });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload, { secret: 'key', expiresIn: '1d' }),
      refreshToken: this.jwtService.sign(payload, { secret: 'refreshkey', expiresIn: '7d' }),
    };
  }

  async sendOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await this.usersService.save(user);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: 'shashilata9519@gmail.com',
        pass: 'nswo frds juog qvrc',
      },
    });

    await transporter.sendMail({
      from: 'shashilata9519@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}, valid for 10 minutes.`,
    });

    return { message: 'OTP sent successfully' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user: any = await this.usersService.findByEmail(email);
    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) throw new UnauthorizedException('Invalid OTP');

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiresAt = null;
    await this.usersService.save(user);

    return { message: 'Password reset successful' };
  }
}
