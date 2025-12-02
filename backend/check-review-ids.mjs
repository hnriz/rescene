import mysql2 from 'mysql2/promise';

(async () => {
  const conn = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aluno',
    database: 'rescene'
  });

  const [reviews] = await conn.execute('SELECT id, user_id, media_id, rating, text, created_at FROM review');
  console.log('Total de reviews:', reviews.length);
  console.log('\nReviews no banco:');
  reviews.forEach(r => {
    console.log(`  ID ${r.id}: media_id=${r.media_id}, rating=${r.rating}, user=${r.user_id}`);
  });

  // Testar se media_id 200875 existe na TMDB
  console.log('\nTestando TMDB com media_id 200875:');
  const apiKey = '75e676add70640aadafcda354ca23a4c';
  let response = await fetch(`https://api.themoviedb.org/3/movie/200875?api_key=${apiKey}`);
  console.log('Status TMDB:', response.status);

  // Testar outros IDs comuns
  console.log('\nTestando IDs comuns na TMDB:');
  for (const id of [550, 278, 238]) {
    response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    const data = await response.json();
    console.log(`  ID ${id} (${response.status}): ${data.title || 'erro'}`);
  }

  await conn.end();
})();
