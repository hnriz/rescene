import mysql2 from 'mysql2/promise';

async function testConnection() {
    try {
        const conn = await mysql2.createConnection({
            host: 'ballast.proxy.rlwy.net',
            user: 'root',
            password: 'gDvjBpBTjplewTSmEgUYyKEmuOLLnhVd',
            database: 'railway',
            port: 49422
        });

        console.log('✅ Conectado ao Railway!\n');

        // Listar tabelas
        const [tables] = await conn.query('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA="railway"');
        console.log('📋 Tabelas encontradas:');
        tables.forEach(t => console.log('   -', t.TABLE_NAME));

        // Verificar estrutura de uma tabela importante
        const [users] = await conn.query('SELECT COUNT(*) as count FROM user');
        console.log(`\n👥 Usuários no banco: ${users[0].count}`);

        await conn.end();
        process.exit(0);
    } catch (e) {
        console.log('❌ Erro:', e.message);
        process.exit(1);
    }
}

testConnection();
