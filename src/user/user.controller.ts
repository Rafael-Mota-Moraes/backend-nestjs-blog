import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly confiService: ConfigService) {}

  @Get(':id')
  findOne(
    @Param('id', CustomParseIntPipe)
    id: number,
  ) {
    console.log(process.env.TESTE);
    console.log(this.confiService.getOrThrow('TESTE', 'valorpadrao'));
    return `Olá do controle do user #${id}`;
  }
}
