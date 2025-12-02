-- Dados de teste para a tabela media
USE rescene;

-- Inserir alguns filmes e séries de teste
INSERT IGNORE INTO `media` (`id`, `name`, `type`, `synopsis`, `released-at`) VALUES
(1, 'The Matrix', 0, 'A hacker discovers the truth about his reality and his role in the war against its controllers.', '1999-03-31'),
(2, 'The Matrix Reloaded', 0, 'Neo and his allies race against time before the machines discover the city of Zion and destroy it.', '2003-05-15'),
(3, 'Breaking Bad', 1, 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to cooking methamphetamine.', '2008-01-20'),
(4, 'Game of Thrones', 1, 'Nine noble families fight for control over the lands of Westeros.', '2011-04-17'),
(5, 'Inception', 0, 'A skilled thief who steals corporate secrets through dream-sharing technology.', '2010-07-16'),
(6, 'The Dark Knight', 0, 'Batman faces off against the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.', '2008-07-18'),
(7, 'Pulp Fiction', 0, 'Multiple interconnected stories of Los Angeles criminals, framed around a central story.', '1994-10-14'),
(8, 'Stranger Things', 1, 'When a young boy disappears, his friends, family and local police unravel a mystery.', '2016-07-15'),
(9, 'Interstellar', 0, 'A team of astronauts travel through a wormhole near Saturn in search of a new home for humanity.', '2014-11-07'),
(10, 'The Office', 1, 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes.', '2005-03-24'),
(11, 'The Shawshank Redemption', 0, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.', '1994-10-14'),
(12, 'Parasite', 0, 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', '2019-05-30'),
(13, 'The Crown', 1, 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.', '2016-11-04'),
(14, 'Chernobyl', 1, 'An account of the disaster at the Chernobyl nuclear power plant and subsequent clean-up efforts.', '2019-05-06'),
(15, 'Dune', 0, 'Paul Atreides, a brilliant young man, must travel to the dangerous planet Dune to ensure the future of his family and people.', '2021-10-22');
