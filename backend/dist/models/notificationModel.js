"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
// src/models/notificationModel.ts
const database_1 = require("../config/database");
class NotificationModel {
    static async findAll() {
        const result = await database_1.pool.query(`
      SELECT * FROM notifications ORDER BY created_at DESC
    `);
        return result.rows;
    }
    static async findById(id) {
        const result = await database_1.pool.query('SELECT * FROM notifications WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    static async create(data) {
        const result = await database_1.pool.query(`INSERT INTO notifications (title, description, hearing_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [data.title, data.description, data.hearing_date, 'Em Andamento']);
        return result.rows[0];
    }
    static async update(id, data) {
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
        const query = `
      UPDATE notifications 
      SET ${fields.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;
        const result = await database_1.pool.query(query, values);
        return result.rows[0];
    }
    static async updateStatus(id, status) {
        const result = await database_1.pool.query(`UPDATE notifications SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`, [status, id]);
        return result.rows[0];
    }
    static async delete(id) {
        await database_1.pool.query('DELETE FROM notifications WHERE id = $1', [id]);
    }
}
exports.NotificationModel = NotificationModel;
//# sourceMappingURL=notificationModel.js.map