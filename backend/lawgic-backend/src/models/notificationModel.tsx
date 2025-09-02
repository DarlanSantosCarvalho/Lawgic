// src/models/notificationModel.ts
import { pool } from '../config/database';
import { Notification, CreateNotificationRequest, UpdateNotificationRequest, NotificationStatus } from '../types/notification';

export class NotificationModel {
  static async findAll(): Promise<Notification[]> {
    const result = await pool.query(`
      SELECT * FROM notifications ORDER BY created_at DESC
    `);
    return result.rows;
  }

  static async findById(id: string): Promise<Notification | null> {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  static async create(data: CreateNotificationRequest): Promise<Notification> {
    const result = await pool.query(
      `INSERT INTO notifications (title, description, hearing_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.title, data.description, data.hearing_date, 'Em Andamento']
    );
    return result.rows[0];
  }

  static async update(id: string, data: UpdateNotificationRequest): Promise<Notification> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('Nenhum campo para atualizar');
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const result = await pool.query(
      `UPDATE notifications SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async updateStatus(id: string, status: NotificationStatus): Promise<Notification> {
    const result = await pool.query(
      `UPDATE notifications SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<void> {
    await pool.query('DELETE FROM notifications WHERE id = $1', [id]);
  }
}