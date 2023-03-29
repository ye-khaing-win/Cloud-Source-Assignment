import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Author } from '@prisma/client';
import { GetAuthor } from '../auth/decorators';
import { JwtGuard } from '../auth/guards';
import {
  Filter,
  Search,
  Select,
  Sort,
  Paginate,
  Serialize,
} from 'src/common/decorators';
import { Paginatables } from 'src/common/enums';
import {
  CastifySearchablePipe,
  CastifySelectablePipe,
  CastifySortablePipe,
} from 'src/common/pipes';
import { AuthorsService } from './authors.service';
import {
  AuthorDto,
  UpdateAuthorDto,
  FilterAuthorDto,
  SearchAuthorDto,
  SelectAuthorDto,
  SortAuthorDto,
} from './dtos';

@Controller('authors')
@Serialize(AuthorDto)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMe(@GetAuthor() author: Author) {
    return author;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  updateMe(@GetAuthor() author: Author, @Body() body: UpdateAuthorDto) {
    return this.authorsService.update(author.id, body);
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMe(@GetAuthor() author: Author) {
    return this.authorsService.delete(author.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Filter() filter: FilterAuthorDto,
    @Search(new CastifySearchablePipe()) search: SearchAuthorDto,
    @Select(new CastifySelectablePipe()) select: SelectAuthorDto,
    @Sort(new CastifySortablePipe())
    orderBy: SortAuthorDto,
    @Paginate(Paginatables.SKIP) skip: number,
    @Paginate(Paginatables.TAKE) take: number,
  ) {
    return this.authorsService.findAll(
      filter,
      search,
      select,
      orderBy,
      skip,
      take,
    );
  }
}
