"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/migrations/migrate.ts
const database_1 = require("../config/database");
const createTables = async () => {
    const client = await database_1.pool.connect();
    try {
        await client.query('BEGIN');
        // Tabela de notificações
        await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        hearing_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'Em Andamento' CHECK (status IN ('Em Andamento', 'Validação', 'Concluído')),
        notified_name VARCHAR(255),
        notified_email VARCHAR(255),
        notified_phone VARCHAR(20),
        notified_address TEXT,
        needs_additional_info BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Trigger para atualizar updated_at
        await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `);
        await client.query(`
      DROP TRIGGER IF EXISTS update_notifications_updated_at ON notifications
    `);
        await client.query(`
      CREATE TRIGGER update_notifications_updated_at
      BEFORE UPDATE ON notifications
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column()
    `);
        await client.query('COMMIT');
        console.log('✅ Tabelas criadas com sucesso');
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Erro ao criar tabelas:', error);
        throw error;
    }
    finally {
        client.release();
    }
};
createTables().then(() => {
    console.log('✅ Migração concluída');
    process.exit(0);
}).catch(error => {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
});
//# sourceMappingURL=migrate.js.map