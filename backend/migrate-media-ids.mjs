import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'rescene'
});

try {
    console.log('🔄 Iniciando migração: Aumentar coluna media-ids...');
    
    // Executar ALTER TABLE
    await conn.execute(`
        ALTER TABLE \`list\` 
        MODIFY COLUMN \`media-ids\` LONGTEXT NULL DEFAULT NULL
    `);
    
    console.log('✅ Coluna media-ids alterada com sucesso de VARCHAR(45) para LONGTEXT');
    
    // Verificar alteração
    const [result] = await conn.execute("SHOW COLUMNS FROM `list` WHERE Field = 'media-ids'");
    console.log('📋 Informações da coluna após alteração:');
    console.log(result[0]);
    
} catch (err) {
    console.error('❌ Erro durante migração:', err.message);
    process.exit(1);
} finally {
    await conn.end();
    process.exit(0);
}
