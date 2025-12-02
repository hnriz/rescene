import mysql2 from 'mysql2/promise';
import 'dotenv/config';

const conn = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'rescene',
    port: process.env.DB_PORT || 3306,
});

const seedData = [
    { id: 1, name: 'The Matrix', type: 0, synopsis: 'A hacker discovers the truth about his reality.', released_at: '1999-03-31' },
    { id: 2, name: 'The Matrix Reloaded', type: 0, synopsis: 'Neo faces new threats from the machines.', released_at: '2003-05-15' },
    { id: 3, name: 'The Matrix Revolutions', type: 0, synopsis: 'The final chapter of the Matrix saga.', released_at: '2003-11-05' },
    { id: 4, name: 'Breaking Bad', type: 1, synopsis: 'A chemistry teacher turns to cooking methamphetamine.', released_at: '2008-01-20' },
    { id: 5, name: 'Game of Thrones', type: 1, synopsis: 'Noble families fight for control over Westeros.', released_at: '2011-04-17' },
    { id: 6, name: 'Inception', type: 0, synopsis: 'A thief steals corporate secrets through dreams.', released_at: '2010-07-16' },
    { id: 7, name: 'The Dark Knight', type: 0, synopsis: 'Batman faces the Joker.', released_at: '2008-07-18' },
    { id: 8, name: 'The Dark Knight Rises', type: 0, synopsis: 'Batman must face a powerful new threat.', released_at: '2012-07-20' },
    { id: 9, name: 'Pulp Fiction', type: 0, synopsis: 'Interconnected stories of Los Angeles criminals.', released_at: '1994-10-14' },
    { id: 10, name: 'Stranger Things', type: 1, synopsis: 'A boy disappears, unraveling a mystery.', released_at: '2016-07-15' },
    { id: 11, name: 'Interstellar', type: 0, synopsis: 'Astronauts search for a new home for humanity.', released_at: '2014-11-07' },
    { id: 12, name: 'The Office', type: 1, synopsis: 'A mockumentary on office workers.', released_at: '2005-03-24' },
    { id: 13, name: 'Friends', type: 1, synopsis: 'Six friends living in New York City.', released_at: '1994-09-22' },
    { id: 14, name: 'The Crown', type: 1, synopsis: 'The political rivalries and romance of Queen Elizabeth II.', released_at: '2016-11-04' },
    { id: 15, name: 'Sherlock', type: 1, synopsis: 'A brilliant detective solving complex mysteries.', released_at: '2010-07-25' },
    { id: 16, name: 'Dune', type: 0, synopsis: 'Paul Atreides must travel to the dangerous planet Dune.', released_at: '2021-10-22' },
    { id: 17, name: 'Avatar', type: 0, synopsis: 'A paraplegic Marine dispatched to infiltrate an alien world.', released_at: '2009-12-18' },
    { id: 18, name: 'Avatar: The Way of Water', type: 0, synopsis: 'Jake Sully explores Pandora with his family.', released_at: '2022-12-16' },
    { id: 19, name: 'Titanic', type: 0, synopsis: 'A romance story aboard the ill-fated ship.', released_at: '1997-12-19' },
    { id: 20, name: 'The Shawshank Redemption', type: 0, synopsis: 'Two imprisoned men bond over the years.', released_at: '1994-10-14' },
    { id: 21, name: 'Parasite', type: 0, synopsis: 'Greed and class discrimination in a wealthy household.', released_at: '2019-05-30' },
    { id: 22, name: 'Chernobyl', type: 1, synopsis: 'The nuclear disaster and clean-up efforts.', released_at: '2019-05-06' },
    { id: 23, name: 'The Mandalorian', type: 1, synopsis: 'A lone bounty hunter in the Star Wars universe.', released_at: '2019-11-12' },
    { id: 24, name: 'House of the Dragon', type: 1, synopsis: 'The history of House Targaryen.', released_at: '2022-08-21' },
    { id: 25, name: 'The Last of Us', type: 1, synopsis: 'A fungal pandemic devastates humanity.', released_at: '2023-01-09' },
    { id: 26, name: 'Oppenheimer', type: 0, synopsis: 'The story of the Manhattan Project scientist.', released_at: '2023-07-21' },
    { id: 27, name: 'Barbie', type: 0, synopsis: 'Barbie explores the real world.', released_at: '2023-07-21' },
    { id: 28, name: 'Killers of the Flower Moon', type: 0, synopsis: 'A crime saga in 1920s Oklahoma.', released_at: '2023-10-20' },
    { id: 29, name: 'Mission: Impossible Dead Reckoning', type: 0, synopsis: 'Ethan Hunt faces his most dangerous mission yet.', released_at: '2023-07-12' },
    { id: 30, name: 'Wednesday', type: 1, synopsis: 'Wednesday Addams attends Nevermore Academy.', released_at: '2022-11-23' },
];

async function seed() {
    try {
        console.log('🌱 Iniciando seed de dados...');
        
        for (const item of seedData) {
            await conn.execute(
                'INSERT IGNORE INTO `media` (`id`, `name`, `type`, `synopsis`, `released-at`) VALUES (?, ?, ?, ?, ?)',
                [item.id, item.name, item.type, item.synopsis, item.released_at]
            );
            console.log(`✅ Inserido: ${item.name}`);
        }
        
        console.log('✨ Seed concluído com sucesso!');
        conn.end();
    } catch (err) {
        console.error('❌ Erro no seed:', err.message);
        conn.end();
        process.exit(1);
    }
}

seed();
