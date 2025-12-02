import mysql2 from 'mysql2/promise';

(async () => {
  const conn = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aluno',
    database: 'rescene'
  });

  const [columns] = await conn.execute('DESCRIBE review');
  console.log('Schema da tabela review:');
  columns.forEach(c => {
    console.log(`  ${c.Field}: ${c.Type}`);
  });

  await conn.end();
})();
