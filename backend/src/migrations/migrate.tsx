// src/migrations/migrate.ts
import { pool } from '../config/database';

const createTables = async () => {
  const client = await pool.connect();

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
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Erro ao criar tabelas:', error);
    throw error;
  } finally {
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

// src/migrations/seed.ts
import { pool } from '../config/database';

const seedData = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Dados de exemplo
    await client.query(`
      INSERT INTO notifications (title, description, hearing_date, status, notified_name, notified_email, notified_phone, notified_address)
      VALUES 
      ('Notificação Criminal', 'Processo por danos materiais', '2023-12-15', 'Em Andamento', 'João Silva', 'joao@email.com', '(11) 99999-9999', 'Rua das Flores, 123 - São Paulo/SP'),
      ('Notificação Cível', 'Ação de indenização por acidente', '2024-01-20', 'Validação', 'Maria Santos', 'maria@email.com', '(11) 98888-8888', 'Av. Paulista, 1000 - São Paulo/SP'),
      ('Notificação Trabalhista', 'Reclamação trabalhista', '2024-02-10', 'Concluído', 'Pedro Oliveira', 'pedro@email.com', '(11) 97777-7777', 'Rua Augusta, 500 - São Paulo/SP')
      ON CONFLICT DO NOTHING
    `);

    await client.query('COMMIT');
    console.log('✅ Dados de seed inseridos com sucesso');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Erro ao inserir dados de seed:', error);
    throw error;
  } finally {
    client.release();
  }
};

seedData().then(() => {
  console.log('✅ Seed concluído');
  process.exit(0);
}).catch(error => {
  console.error('❌ Erro no seed:', error);
  process.exit(1);
});