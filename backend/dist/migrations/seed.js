"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const seedData = async () => {
    const client = await database_1.pool.connect();
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
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Erro ao inserir dados de seed:', error);
        throw error;
    }
    finally {
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
//# sourceMappingURL=seed.js.map