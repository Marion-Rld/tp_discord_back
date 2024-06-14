// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { Utilisateur } from 'src/utilisateur/utilisateur.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Utilisateur.name) private utilisateurModel: Model<Utilisateur>,
  ) {}

  async create(createdMessageDto: any): Promise<Message> {
    const utilisateur = await this.utilisateurModel.findOne({
      email: createdMessageDto.utilisateur,
    });

    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé');
    }

    const createdMessage = new this.messageModel({
      ...createdMessageDto,
      utilisateur: utilisateur._id,
      salon: createdMessageDto.salon,
    });
    return createdMessage.save();
  }

  async findAllMessageOfSalon(salonId: string): Promise<Message[]> {
    return await this.messageModel
      .find({ salon: salonId })
      .populate('utilisateur')
      .exec();
  }
}
