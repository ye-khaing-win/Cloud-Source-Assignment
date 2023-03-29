import { Catch } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common/interfaces';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { Statuses } from '../enums/statuses.enum';

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientValidationError implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    response.status(HttpStatus.BAD_REQUEST).json({
      status: Statuses.ERROR,
      message,
    });
  }
}
