import mysql2 from 'mysql2/promise';

const checkDatabase = async () => {
  try {
    const conn = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'aluno',
      database: 'rescene'
    });

    // Verificar estrutura da tabela user
    const [rows] = await conn.execute('DESCRIBE user');
    console.log('Colunas da tabela user:');
    console.table(rows);

    // Verificar se há usuários
    const [users] = await conn.execute('SELECT id, username, created_at, last_active FROM user LIMIT 1');
    console.log('\nUm usuário de exemplo:');
    console.log(users[0]);

    await conn.end();
  } catch (err) {
    console.error('Erro:', err.message);
  }
};

checkDatabase();
