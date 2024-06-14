import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  contenu: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Utilisateur' })
  utilisateur: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Salon' })
  salon: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
