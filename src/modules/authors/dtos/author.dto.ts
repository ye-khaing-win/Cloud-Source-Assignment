import { Author } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class AuthorDto implements Author {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  ph_no: string;

  @Expose()
  address: string;

  @Expose()
  roleId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
