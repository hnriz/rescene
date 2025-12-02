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
    console.log('🔄 Verificando estrutura da tabela list...');
    
    // Verificar se coluna likes-count existe
    const [columns] = await conn.execute(`
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'list' AND COLUMN_NAME = 'likes-count'
    `);
    
    if (columns.length === 0) {
        console.log('❌ Coluna likes-count não existe. Adicionando...');
        await conn.execute(`
            ALTER TABLE \`list\` 
            ADD COLUMN \`likes-count\` INT NOT NULL DEFAULT 0
        `);
        console.log('✅ Coluna likes-count adicionada com sucesso!');
    } else {
        console.log('✅ Coluna likes-count já existe');
    }
    
    // Verificar media-ids
    const [mediaIds] = await conn.execute(`
        SELECT COLUMN_NAME, COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'list' AND COLUMN_NAME = 'media-ids'
    `);
    
    if (mediaIds.length > 0) {
        console.log('📊 Coluna media-ids encontrada:', mediaIds[0].COLUMN_TYPE);
        if (mediaIds[0].COLUMN_TYPE !== 'longtext') {
            console.log('⚠️ media-ids não é LONGTEXT. Convertendo...');
            await conn.execute(`
                ALTER TABLE \`list\` 
                MODIFY COLUMN \`media-ids\` LONGTEXT NULL DEFAULT NULL
            `);
            console.log('✅ Coluna media-ids convertida para LONGTEXT');
        }
    }
    
    console.log('✅ Verificação concluída');
    
} catch (err) {
    console.error('❌ Erro durante verificação:', err.message);
    process.exit(1);
} finally {
    await conn.end();
    process.exit(0);
}
