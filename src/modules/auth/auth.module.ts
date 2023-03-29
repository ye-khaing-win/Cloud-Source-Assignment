import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthorsModule } from '../authors/authors.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [AuthorsModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

//asdf
