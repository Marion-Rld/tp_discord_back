// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salon, SalonDocument } from './salon.schema';
import { Utilisateur } from 'src/utilisateur/utilisateur.schema';
import { ServeurDocument } from 'src/serveur/serveur.schema';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,
    @InjectModel(Utilisateur.name)
    private serveurModel: Model<ServeurDocument>,
  ) {}

  async create(createdSalonDto: any): Promise<Salon> {
    const createdSalon = new this.salonModel(createdSalonDto);
    return createdSalon.save();
  }

  async findAllSalonOfServer(serverId: string): Promise<Salon[]> {
    return await this.salonModel.find({ serveur: serverId }).exec();
  }
}
