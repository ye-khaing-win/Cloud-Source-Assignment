import * as argon from 'argon2';
import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { ErrorMessages } from 'src/common/enums';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dtos';
import { AuthorsService } from '../authors/authors.service';
import { Serialize } from 'src/common/decorators';

@Controller('auth')
@Serialize()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Post('signup')
  async signup(@Body() data: SignupDto) {
    const { name, email, password, ph_no, address } = data;

    const isTaken = await this.authorsService.findOneByEmail(email);

    if (isTaken) {
      throw new ForbiddenException(ErrorMessages.CREDENTIALS_TAKEN);
    }

    const user = await this.authorsService.create({
      name,
      email,
      password,
      ph_no,
      address,
    });

    return await this.authService.getSignToken(user.id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authorsService.findOneByEmail(email);

    if (!user) {
      throw new ForbiddenException(ErrorMessages.CREDENTIALS_INCORRECT);
    }

    const isPasswordMatched = await argon.verify(user.password, password);

    if (!isPasswordMatched) {
      throw new ForbiddenException(ErrorMessages.CREDENTIALS_INCORRECT);
    }

    return await this.authService.getSignToken(user.id);
  }
}
