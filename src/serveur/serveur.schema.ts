import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServeurDocument = Serveur & Document;

@Schema()
export class Serveur {
  @Prop({ required: true })
  nom: string;

  @Prop()
  description: string;

  @Prop()
  public: boolean;
}

export const ServeurSchema = SchemaFactory.createForClass(Serveur);
