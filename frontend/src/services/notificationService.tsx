// src/services/notificationService.ts
import { api } from '@/lib/api';
import { Notification } from '@/store/notifications';

export const notificationService = {
  async getAll(): Promise<Notification[]> {
    const response = await api.get('/notifications');
    return response.data.data;
  },

async getById(id: string): Promise<Notification> {
    try {
      console.log('🔍 Iniciando request para API...');
      console.log('📡 URL completa:', `http://localhost:3001/api/notifications/${id}`);
      
      const response = await api.get(`/notifications/${id}`);
      
      console.log('✅ Sucesso! Status:', response.status);
      console.log('📦 Dados recebidos:', response.data);
      
      return response.data.data;
    } catch (error: any) {
      console.error('💥 ERRO NA REQUISIÇÃO:');
      console.error('Status:', error.response?.status);
      console.error('Mensagem:', error.response?.data);
      console.error('URL:', error.config?.url);
      console.error('Erro completo:', error);
      
      throw error;
    }
  },

  async create(data: any): Promise<Notification> {
    const response = await api.post('/notifications', data);
    return response.data.data;
  },

  async update(id: string, data: any): Promise<Notification> {
    const response = await api.put(`/notifications/${id}`, data);
    return response.data.data;
  },

  async validate(id: string, needsAdditionalInfo: boolean): Promise<Notification> {
    const response = await api.patch(`/notifications/${id}/validate`, {
      needs_additional_info: needsAdditionalInfo
    });
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  }
};