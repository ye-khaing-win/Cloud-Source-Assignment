import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ErrorMessages } from '../enums';
import { Statuses } from '../enums/statuses.enum';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    console.log(exception);
    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          status: Statuses.ERROR,
          message: ErrorMessages.PRISMA_DUPLICATED.replace(
            '{{values}}',
            exception.meta.target.toString(),
          ),
        });

        break;
      case 'P2003':
        response.status(HttpStatus.FORBIDDEN).json({
          status: Statuses.ERROR,
          message: ErrorMessages.PRISMA_BELONGED,
        });

        break;

      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          status: Statuses.ERROR,
          message,
        });

        break;
      default:
        super.catch(exception, host);
    }
  }
}
