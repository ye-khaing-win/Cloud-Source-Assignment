import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Author } from '@prisma/client';
import { GetAuthor } from '../auth/decorators';
import { JwtGuard } from '../auth/guards';
import {
  Filter,
  Paginate,
  Search,
  Select,
  Serialize,
  Sort,
} from 'src/common/decorators';
import { Paginatables } from 'src/common/enums';
import {
  CastifySearchablePipe,
  CastifySelectablePipe,
  CastifySortablePipe,
} from 'src/common/pipes';
import { BooksService } from './books.service';
import {
  BookDto,
  CreateBookDto,
  FilterBookDto,
  SearchBookDto,
  SelectBookDto,
  SortBookDto,
  UpdateBookDto,
} from './dtos';

@Controller('books')
@Serialize(BookDto)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateBookDto, @GetAuthor() author: Author) {
    return this.booksService.create(author.id, body);
  }

  @UseGuards(JwtGuard)
  @Patch('publish/:id')
  @HttpCode(HttpStatus.OK)
  publish(@Param('id') id: string, @GetAuthor('id') authorId: string) {
    return this.booksService.publish(id, authorId);
  }

  @Get('publish')
  @HttpCode(HttpStatus.OK)
  findAllPublished(
    @Filter() filter: FilterBookDto,
    @Search(new CastifySearchablePipe()) search: SearchBookDto,
    @Select(new CastifySelectablePipe()) select: SelectBookDto,
    @Sort(new CastifySortablePipe())
    orderBy: SortBookDto,
    @Paginate(Paginatables.SKIP) skip: number,
    @Paginate(Paginatables.TAKE) take: number,
  ) {
    return this.booksService.findAllPublished(
      filter,
      search,
      select,
      orderBy,
      skip,
      take,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Filter() filter: FilterBookDto,
    @Search(new CastifySearchablePipe()) search: SearchBookDto,
    @Select(new CastifySelectablePipe()) select: SelectBookDto,
    @Sort(new CastifySortablePipe())
    orderBy: SortBookDto,
    @Paginate(Paginatables.SKIP) skip: number,
    @Paginate(Paginatables.TAKE) take: number,
  ) {
    return this.booksService.findAll(
      filter,
      search,
      select,
      orderBy,
      skip,
      take,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id') id: string,
    @Select(new CastifySelectablePipe()) select: SelectBookDto,
  ) {
    return this.booksService.findOne(id, select);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() body: UpdateBookDto,
    @GetAuthor('id') authorId: string,
  ) {
    return this.booksService.update(id, authorId, body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string, @GetAuthor('id') authorId: string) {
    return this.booksService.delete(id, authorId);
  }
}
