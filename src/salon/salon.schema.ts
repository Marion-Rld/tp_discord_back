import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SalonDocument = Salon & Document;

@Schema()
export class Salon {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nom: string;

  @Prop()
  messages: string[];

  @Prop({ type: Types.ObjectId, ref: 'Serveur' })
  serveur: Types.ObjectId;
}

export const SalonSchema = SchemaFactory.createForClass(Salon);
