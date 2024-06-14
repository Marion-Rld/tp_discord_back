import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ServeurDocument = Serveur & Document;

@Schema()
export class Serveur {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nom: string;

  @Prop({ maxlength: 100 })
  description: string;

  @Prop()
  urlLogo: string;

  @Prop()
  public: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Salon' }] })
  salons: Types.ObjectId[];

  @Prop({ type: [String] })
  participants: string[];

  @Prop({ type: String, required: true })
  createur: string;

  @Prop()
  utilisateurs_ban: string[];
}

export const ServeurSchema = SchemaFactory.createForClass(Serveur);
