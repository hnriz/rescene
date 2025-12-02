import mysql2 from 'mysql2/promise';

(async () => {
  try {
    const conn = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'aluno',
      database: 'rescene'
    });

    console.log('🔍 Checking for list_like table...');
    try {
      const [likeCols] = await conn.execute('DESCRIBE list_like');
      console.log('✅ list_like table EXISTS:');
      likeCols.forEach(col => {
        console.log(`  ${col.Field}: ${col.Type}`);
      });
    } catch (err) {
      console.log('❌ list_like table DOES NOT EXIST');
    }

    console.log('\n🔍 Checking for saved_list table...');
    try {
      const [savedCols] = await conn.execute('DESCRIBE saved_list');
      console.log('✅ saved_list table EXISTS:');
      savedCols.forEach(col => {
        console.log(`  ${col.Field}: ${col.Type}`);
      });
    } catch (err) {
      console.log('❌ saved_list table DOES NOT EXIST');
    }

    console.log('\n🔍 Checking for all tables...');
    const [tables] = await conn.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'rescene'");
    console.log('Tables in rescene database:');
    tables.forEach(t => {
      console.log(`  - ${t.table_name}`);
    });

    await conn.end();
  } catch (err) {
    console.error('Erro:', err.message);
    process.exit(1);
  }
})();
