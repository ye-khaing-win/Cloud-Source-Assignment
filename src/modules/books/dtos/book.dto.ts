import { Book } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AuthorDto } from 'src/modules/authors/dtos';

export class BookDto implements Book {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Expose()
  isPublished: boolean;

  @Expose()
  authorId: string;

  @Expose()
  @ValidateNested()
  @Type(() => AuthorDto)
  author: AuthorDto;
}
