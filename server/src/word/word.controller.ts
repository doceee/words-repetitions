import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { LoggedInGuard } from '../auth/guard';
import { WordRepository } from './word.repository';
import { GetUser } from '../auth/decorator';
import { CreateWordDto, EditWordDto } from './dto';
import { WordService } from './word.service';
import { ValidationError } from 'class-validator';
import { BadRequestException } from '../exceptions/bad.request.exception';

@UseGuards(LoggedInGuard)
@Controller('words')
export class WordController {
  constructor(
    private wordRepository: WordRepository,
    private wordService: WordService,
  ) {}

  @Get()
  getWords(@GetUser('id') userId: string) {
    return this.wordRepository.getWords(userId);
  }

  @Get(':id')
  getWordById(@GetUser('id') userId: string, @Param('id') wordId: string) {
    return this.wordRepository.getWordById(userId, wordId);
  }

  @Get('search/:text')
  searchWord(@GetUser('id') userId: string, @Param('text') text: string) {
    return this.wordService.searchWord(text, userId);
  }

  @Post()
  async createWord(
    @GetUser('id') userId: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors: ValidationError[] = []) =>
          new BadRequestException(errors),
      }),
    )
    dto: CreateWordDto,
  ) {
    const isCreated = await this.wordRepository.isWordAssigned(
      userId,
      dto.word,
      dto.translation,
    );

    if (isCreated) {
      throw new BadRequestException([
        {
          property: 'word',
          constraints: { word: 'Słówko jest już na liście' },
        },
      ]);
    }

    return this.wordRepository.createWord(userId, dto);
  }

  @Put(':id')
  async editWordById(
    @GetUser('id') userId: string,
    @Param('id') wordId: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors: ValidationError[] = []) =>
          new BadRequestException(errors),
      }),
    )
    dto: EditWordDto,
  ) {
    const isCreated = await this.wordRepository.isWordAssigned(
      userId,
      dto.word,
      dto.translation,
      wordId,
    );

    if (isCreated) {
      throw new BadRequestException([
        {
          property: 'word',
          constraints: { word: 'Słówko jest już na liście' },
        },
      ]);
    }

    return this.wordRepository.editWordById(userId, wordId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteWordById(@GetUser('id') userId: string, @Param('id') wordId: string) {
    return this.wordRepository.deleteWordById(userId, wordId);
  }
}
