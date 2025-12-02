import mysql2 from 'mysql2/promise';

(async () => {
  try {
    const conn = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'aluno',
      database: 'rescene'
    });

    console.log('📋 SCHEMA DA TABELA review:');
    const [reviewColumns] = await conn.execute('DESCRIBE review');
    reviewColumns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type}`);
    });

    console.log('\n📋 SCHEMA DA TABELA media:');
    const [mediaColumns] = await conn.execute('DESCRIBE media');
    mediaColumns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type}`);
    });

    console.log('\n📊 SAMPLE REVIEW COM DADOS:');
    const [reviews] = await conn.execute('SELECT r.* FROM review r LIMIT 1');
    if (reviews.length > 0) {
      console.log(JSON.stringify(reviews[0], null, 2));
    }

    console.log('\n📊 SAMPLE MEDIA COM DADOS:');
    const [medias] = await conn.execute('SELECT * FROM media LIMIT 1');
    if (medias.length > 0) {
      console.log(JSON.stringify(medias[0], null, 2));
    }

    console.log('\n📊 REVIEW COM DADOS DO MEDIA:');
    const [fullReview] = await conn.execute(`
      SELECT r.*, m.name as movieTitle, m.cover as moviePoster, m.\`released-at\` as movieYear
      FROM review r
      JOIN media m ON r.media_id = m.id
      LIMIT 1
    `);
    if (fullReview.length > 0) {
      console.log(JSON.stringify(fullReview[0], null, 2));
    }

    await conn.end();
  } catch (err) {
    console.error('Erro:', err.message);
    process.exit(1);
  }
})();
