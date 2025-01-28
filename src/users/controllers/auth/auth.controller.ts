import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthService } from 'src/users/services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async registerUsers(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }
  @Post('/login')
  async loginUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.loginUser(createUserDto);
    if (!user) {
      throw new Error('User not found');
    }
    const payload: jwt.JwtPayload = { _id: user.id };
    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: 'helloliAm',
    });

    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 60);
    // res.cookie('access_token', accessToken, {
    //   expires: expDate,
    //   httpOnly: false,
    // });
    return { user, accessToken };
  }
}
