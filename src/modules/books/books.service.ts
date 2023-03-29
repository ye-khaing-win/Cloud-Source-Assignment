import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorMessages } from 'src/common/enums';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBookDto,
  UpdateBookDto,
  FilterBookDto,
  SearchBookDto,
  SelectBookDto,
  SortBookDto,
} from './dtos';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(authorId: string, data: CreateBookDto) {
    return this.prisma.book.create({ data: { ...data, authorId } });
  }

  findAll(
    filter: FilterBookDto,
    search: SearchBookDto,
    select: SelectBookDto,
    orderBy: SortBookDto,
    skip: number,
    take: number,
  ) {
    return this.prisma.book.findMany({
      where: { ...filter, ...search },
      select,
      orderBy,
      skip,
      take,
    });
  }

  findAllPublished(
    filter: FilterBookDto,
    search: SearchBookDto,
    select: SelectBookDto,
    orderBy: SortBookDto,
    skip: number,
    take: number,
  ) {
    return this.prisma.book.findMany({
      where: { ...filter, ...search, isPublished: true },
      select,
      orderBy,
      skip,
      take,
    });
  }

  async findOne(id: string, select: SelectBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select,
    });

    if (!book) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_WITH_ID);
    }

    return book;
  }

  async update(id: string, authorId: string, data: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_WITH_ID);
    }

    if (book.authorId !== authorId) {
      throw new UnauthorizedException(ErrorMessages.ACCESS_UNAUTHORIZED);
    }

    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async publish(id: string, authorId: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_WITH_ID);
    }

    if (book.authorId !== authorId) {
      throw new UnauthorizedException(ErrorMessages.ACCESS_UNAUTHORIZED);
    }

    return this.prisma.book.update({
      where: { id },
      data: { isPublished: true },
    });
  }

  async delete(id: string, authorId: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_WITH_ID);
    }

    if (book.authorId !== authorId) {
      throw new UnauthorizedException(ErrorMessages.ACCESS_UNAUTHORIZED);
    }

    return this.prisma.book.delete({ where: { id } });
  }
}
