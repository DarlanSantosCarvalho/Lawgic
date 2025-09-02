// src/models/Notification.ts
import { Schema, model, Document } from 'mongoose';

export interface INotification extends Document {
  title: string;
  description: string;
  hearing_date: Date;
  status: 'Em Andamento' | 'Validação' | 'Concluído';
  notified_name?: string;
  notified_email?: string;
  notified_phone?: string;
  notified_address?: string;
  needs_additional_info?: boolean;
}

const NotificationSchema = new Schema<INotification>({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    maxlength: [255, 'Título muito longo']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  hearing_date: {
    type: Date,
    required: [true, 'Data da audiência é obrigatória']
  },
  status: {
    type: String,
    enum: {
      values: ['Em Andamento', 'Validação', 'Concluído'],
      message: 'Status inválido'
    },
    default: 'Em Andamento'
  },
  notified_name: {
    type: String,
    maxlength: [255, 'Nome muito longo']
  },
  notified_email: {
    type: String,
    maxlength: [255, 'Email muito longo'],
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  notified_phone: {
    type: String,
    maxlength: [20, 'Telefone muito longo']
  },
  notified_address: {
    type: String,
    maxlength: [500, 'Endereço muito longo']
  },
  needs_additional_info: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export const Notification = model<INotification>('Notification', NotificationSchema);