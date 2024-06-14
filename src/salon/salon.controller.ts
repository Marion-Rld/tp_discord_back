import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { SalonService } from './salon.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Get('/par-serveur/:serveurId')
  @UseGuards(AuthGuard)
  findAllSalonByServer(@Param('serveurId') serveurId: string) {
    return this.salonService.findAllSalonOfServer(serveurId);
  }

  @Post()
  async create(@Body() createSalonDto: any) {
    return this.salonService.create(createSalonDto);
  }
}
