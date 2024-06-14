import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ServeurService } from './serveur.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('serveur')
export class ServeurController {
  constructor(private readonly serveurService: ServeurService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() requete) {
    console.log(requete.user.sub);

    return this.serveurService.findAllPublic(requete.user.sub);
  }

  @Get('/possede')
  @UseGuards(AuthGuard)
  findAllServerOfUser(@Request() requete) {
    return this.serveurService.findAllServerOfUser(requete.user.sub);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createServeurDto: any, @Request() req) {
    const createurId = req.user.sub;
    return this.serveurService.create(createServeurDto, createurId);
  }

  @Get('/participants/:id')
  @UseGuards(AuthGuard)
  findParticipants(@Param('id') id: string) {
    return this.serveurService.findParticipants(id);
  }

  @Delete('/:serveurId/ban/:participantId')
  @UseGuards(AuthGuard)
  async banParticipant(
    @Param('serveurId') serveurId: string,
    @Param('participantId') participantId: string,
    @Request() req,
  ) {
    const utilisateurId = req.user.sub;
    return this.serveurService.banParticipant(
      serveurId,
      participantId,
      utilisateurId,
    );
  }
}
