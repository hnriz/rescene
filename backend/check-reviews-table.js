import mysql2 from 'mysql2/promise';

const checkReviewsTable = async () => {
  try {
    const conn = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'aluno',
      database: 'rescene'
    });

    console.log('🔍 Verificando tabela review...\n');

    // Verificar se a tabela existe
    const [tables] = await conn.execute(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='rescene' AND TABLE_NAME='review'"
    );

    if (tables.length === 0) {
      console.log('❌ Tabela review NÃO existe!');
      console.log('\n✅ Criando tabela review...');
      
      await conn.execute(`
        CREATE TABLE review (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          media_id INT NOT NULL,
          rating FLOAT NOT NULL,
          text LONGTEXT NOT NULL,
          likes_count INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
          INDEX idx_user_id (user_id),
          INDEX idx_created_at (created_at)
        )
      `);
      
      console.log('✅ Tabela review criada com sucesso!');
    } else {
      console.log('✅ Tabela review existe!');
    }

    // Verificar colunas
    const [columns] = await conn.execute('DESCRIBE review');
    console.log('\n📋 Colunas da tabela review:');
    console.table(columns);

    // Verificar reviews existentes
    const [reviews] = await conn.execute('SELECT COUNT(*) as total FROM review');
    console.log(`\n📊 Total de reviews: ${reviews[0].total}`);

    // Se houver reviews, mostrar um exemplo
    if (reviews[0].total > 0) {
      const [example] = await conn.execute(`
        SELECT r.*, u.username, u.\`display-name\` as displayName
        FROM review r
        JOIN user u ON r.user_id = u.id
        LIMIT 1
      `);
      console.log('\n📝 Exemplo de review:');
      console.log(example[0]);
    }

    // Verificar se há tabela review_like
    const [likeTables] = await conn.execute(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='rescene' AND TABLE_NAME='review_like'"
    );

    if (likeTables.length === 0) {
      console.log('\n⚠️  Tabela review_like NÃO existe!');
      console.log('✅ Criando tabela review_like...');
      
      await conn.execute(`
        CREATE TABLE review_like (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          review_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_like (user_id, review_id),
          FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
          FOREIGN KEY (review_id) REFERENCES review(id) ON DELETE CASCADE,
          INDEX idx_review_id (review_id)
        )
      `);
      
      console.log('✅ Tabela review_like criada com sucesso!');
    } else {
      console.log('\n✅ Tabela review_like existe!');
    }

    await conn.end();
    console.log('\n✅ Verificação concluída!');
  } catch (err) {
    console.error('❌ Erro:', err.message);
    console.error(err);
    process.exit(1);
  }
};

checkReviewsTable();
