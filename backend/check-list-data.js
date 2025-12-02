import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function checkListData() {
    let conn;
    try {
        conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        console.log('✅ Conectado ao banco de dados\n');

        // Verificar listas
        console.log('📋 Listas no banco:');
        const [lists] = await conn.query('SELECT id, `list-name`, `description`, user_id FROM `list`');
        console.table(lists);

        // Verificar usuários
        console.log('\n👥 Usuários no banco:');
        const [users] = await conn.query('SELECT id, username, avatar FROM `user`');
        console.table(users);

        // Fazer o JOIN
        console.log('\n🔗 Resultado do JOIN:');
        const [joined] = await conn.query(`
            SELECT 
                l.id, 
                l.\`list-name\` as name, 
                l.\`description\`, 
                l.user_id,
                u.\`username\` as ownerName,
                u.\`avatar\` as ownerAvatar
            FROM \`list\` l
            LEFT JOIN \`user\` u ON l.user_id = u.id
        `);
        console.table(joined);

    } catch (err) {
        console.error('❌ Erro:', err.message);
    } finally {
        if (conn) {
            await conn.end();
        }
    }
}

checkListData();
