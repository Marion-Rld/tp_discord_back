import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/par-salon/:salonId')
  @UseGuards(AuthGuard)
  findAllMessageBySalon(@Param('salonId') salonId: string) {
    return this.messageService.findAllMessageOfSalon(salonId);
  }

  @Post()
  async create(@Body() createMessageDto: any) {
    return this.messageService.create(createMessageDto);
  }
}
