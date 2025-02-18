import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import { signUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, fullName, password }: signUpDto): Promise<string> {
    const existsUser = await this.userModel.findOne({ email });
    if (existsUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    return 'User registered successfully';
  }
  async signIn({
    email,
    password,
  }: signInDto): Promise<{ accesToken: string }> {
    const existUser = await this.userModel.findOne({ email });
    if (!existUser)
      throw new BadRequestException('Email or password is invalid');

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual)
      throw new BadRequestException('Email or password is invalid');

    const payload = {
      userId: existUser._id,
    };

    const accesToken = await this.jwtService.sign(payload, { expiresIn: '1h' });

    return { accesToken };
  }

  async getCurrentUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
}
