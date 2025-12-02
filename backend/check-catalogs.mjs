import mysql2 from 'mysql2/promise';

(async () => {
  try {
    const conn = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'aluno',
      database: 'rescene'
    });

    console.log('📋 SCHEMA movie-catalog:');
    const [movieCols] = await conn.execute('DESCRIBE `movie-catalog`');
    movieCols.forEach(col => console.log('  ', col.Field, ':', col.Type));

    console.log('\n📋 SCHEMA series-catalog:');
    const [seriesCols] = await conn.execute('DESCRIBE `series-catalog`');
    seriesCols.forEach(col => console.log('  ', col.Field, ':', col.Type));

    console.log('\n📊 Count movie-catalog:');
    const [movieCount] = await conn.execute('SELECT COUNT(*) as total FROM `movie-catalog`');
    console.log('Total:', movieCount[0].total);

    console.log('\n📊 Count series-catalog:');
    const [seriesCount] = await conn.execute('SELECT COUNT(*) as total FROM `series-catalog`');
    console.log('Total:', seriesCount[0].total);

    console.log('\n📊 SAMPLE movie-catalog (com ID 200875):');
    const [movies] = await conn.execute('SELECT * FROM `movie-catalog` WHERE id = 200875 LIMIT 1');
    if (movies.length > 0) {
      console.log(JSON.stringify(movies[0], null, 2));
    } else {
      console.log('Não encontrado. Primeiros 3:');
      const [allMovies] = await conn.execute('SELECT id, title, poster_url, release_year FROM `movie-catalog` LIMIT 3');
      console.log(JSON.stringify(allMovies, null, 2));
    }

    await conn.end();
  } catch (err) {
    console.error('Erro:', err.message);
    process.exit(1);
  }
})();
