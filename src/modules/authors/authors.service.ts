import * as argon from 'argon2';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAuthorDto,
  UpdateAuthorDto,
  FilterAuthorDto,
  SearchAuthorDto,
  SelectAuthorDto,
  SortAuthorDto,
} from './dtos';
import { ErrorMessages } from 'src/common/enums';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAuthorDto) {
    const { password } = data;
    const hash = await argon.hash(password);

    return this.prisma.author.create({
      data: { ...data, password: hash },
    });
  }

  async findAll(
    filter: FilterAuthorDto,
    search: SearchAuthorDto,
    select: SelectAuthorDto,
    orderBy: SortAuthorDto,
    skip: number,
    take: number,
  ) {
    return this.prisma.author.findMany({
      where: { ...filter, ...search },
      select,
      orderBy,
      skip,
      take,
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.author.findUnique({ where: { email } });
  }

  async update(id: string, data: UpdateAuthorDto) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_WITH_ID);
    }

    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_WITH_ID);
    }

    return this.prisma.author.delete({ where: { id } });
  }
}
