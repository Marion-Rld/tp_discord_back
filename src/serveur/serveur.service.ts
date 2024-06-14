// src/cats/cats.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serveur, ServeurDocument } from './serveur.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from 'src/utilisateur/utilisateur.schema';

@Injectable()
export class ServeurService {
  constructor(
    @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

  async create(createServeurDto: any, createurId: string): Promise<Serveur> {
    const createdServeur = new this.serveurModel({
      ...createServeurDto,
      createur: createurId,
    });
    return createdServeur.save();
  }

  async findAllPublic(email: string): Promise<Serveur[]> {
    return this.serveurModel.find({
      public: true,
      utilisateurs_ban: { $ne: email },
    });
  }

  async findAllServerOfUser(email: string): Promise<Serveur[]> {
    const utilisateur = await this.utilisateurModel.findOne({ email });

    const serveurs = await this.serveurModel.find({
      _id: { $in: utilisateur.serveurs },
      utilisateurs_ban: { $ne: email },
    });

    return serveurs;
  }

  async findParticipants(serveurId: string): Promise<Utilisateur[]> {
    const serveur = await this.serveurModel
      .findById(serveurId)
      .populate('createur');
    if (!serveur) {
      throw new Error('Serveur non trouvé');
    }

    const participants = await this.utilisateurModel.find({
      serveurs: serveurId,
    });
    return participants;
  }

  async banParticipant(
    serveurId: string,
    participantId: string,
    utilisateurId: string,
  ) {
    const serveur = await this.serveurModel.findById(serveurId);
    if (!serveur) {
      throw new NotFoundException('Serveur non trouvé');
    }

    if (serveur.createur !== utilisateurId) {
      throw new Error("Vous n'êtes pas le créateur de ce serveur");
    }

    serveur.participants = serveur.participants.filter(
      (p) => p !== participantId,
    );

    const utilisateurBanni =
      await this.utilisateurModel.findById(participantId);

    if (utilisateurBanni && utilisateurBanni.email) {
      if (!serveur.utilisateurs_ban) {
        serveur.utilisateurs_ban = [];
      }
      serveur.utilisateurs_ban.push(utilisateurBanni.email);
    }

    await serveur.save();

    await this.utilisateurModel.updateOne(
      { _id: participantId },
      { $pull: { serveurs: serveurId } },
    );
  }
}
