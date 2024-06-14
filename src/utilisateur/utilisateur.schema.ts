import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UtilisateurDocument = Utilisateur & Document;

@Schema()
export class Utilisateur {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  urlAvatar: string;

  @Prop({ type: [String] })
  serveurs: string[];
}

export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur);
