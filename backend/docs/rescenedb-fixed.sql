-- Criar banco de dados rescene
-- SCHEMA FINAL CONSOLIDADO - Última versão (2025-12-02)
-- 
-- Alterações aplicadas:
-- ✅ user: Adicionada coluna created_at (removida: last_active - não utilizada)
-- ✅ review: Adicionadas colunas movie_title, movie_year, movie_poster
-- ✅ review_like: Tabela de likes nas reviews
-- ✅ list: Adicionada coluna description, list-cover alterado para LONGBLOB
-- ✅ follower: Tabela de relacionamento de followers/following
-- 
-- NOTA: Scripts obsoletos (não aplicar):
--       - remove-created-at.sql (created_at é usado pelo código)
--       - remove-last-active.sql (last_active não é usado e foi removido)

CREATE DATABASE IF NOT EXISTS rescene;
USE rescene;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(15) NOT NULL UNIQUE,
  `display-name` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `bio` VARCHAR(250) NULL,
  `avatar` LONGBLOB NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `language` CHAR(5) NOT NULL DEFAULT 'pt-BR',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Tabela de catálogo de séries
CREATE TABLE IF NOT EXISTS `series-catalog` (
  `id` INT NOT NULL,
  `popular-id` INT NULL,
  `recommended-id` INT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Tabela de catálogo de filmes
CREATE TABLE IF NOT EXISTS `movie-catalog` (
  `id` INT NOT NULL,
  `popular-id` INT NULL,
  `recommended-id` INT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Tabela de mídia
CREATE TABLE IF NOT EXISTS `media` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `type` BIT NULL,
  `synopsis` VARCHAR(500) NULL,
  `cover` BLOB NULL,
  `released-at` DATE NULL,
  `director` VARCHAR(50) NULL,
  `series-catalog_id` INT NULL,
  `movie-catalog_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_media_series-catalog1_idx` (`series-catalog_id` ASC),
  INDEX `fk_media_movie-catalog1_idx` (`movie-catalog_id` ASC),
  CONSTRAINT `fk_media_series-catalog1`
    FOREIGN KEY (`series-catalog_id`)
    REFERENCES `series-catalog` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_media_movie-catalog1`
    FOREIGN KEY (`movie-catalog_id`)
    REFERENCES `movie-catalog` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS `review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` DECIMAL(3,1) NOT NULL CHECK (`rating` >= 0 AND `rating` <= 10),
  `text` VARCHAR(1000) NULL,
  `likes_count` INT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  `media_id` INT NOT NULL,
  `movie_title` VARCHAR(255) NULL,
  `movie_year` INT NULL,
  `movie_poster` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_review_user1_idx` (`user_id` ASC),
  INDEX `idx_media_id` (`media_id` ASC),
  CONSTRAINT `fk_review_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Tabela de likes nas reviews
CREATE TABLE IF NOT EXISTS `review_like` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `review_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`user_id`, `review_id`),
  INDEX `fk_review_like_user_idx` (`user_id` ASC),
  INDEX `fk_review_like_review_idx` (`review_id` ASC),
  CONSTRAINT `fk_review_like_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_review_like_review`
    FOREIGN KEY (`review_id`)
    REFERENCES `review` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Tabela de listas
CREATE TABLE IF NOT EXISTS `list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `list-name` VARCHAR(50) NULL,
  `description` VARCHAR(500) NULL,
  `list-cover` LONGBLOB NULL,
  `createdAt` DATE NULL,
  `last-update` DATE NULL,
  `media-qtd` INT NULL,
  `media-ids` VARCHAR(45) NULL,
  `likes-count` INT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_list_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_list_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela de likes nas listas
CREATE TABLE IF NOT EXISTS `list_like` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`user_id`, `list_id`),
  INDEX `fk_list_like_user_idx` (`user_id` ASC),
  INDEX `fk_list_like_list_idx` (`list_id` ASC),
  CONSTRAINT `fk_list_like_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_list_like_list`
    FOREIGN KEY (`list_id`)
    REFERENCES `list` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Tabela de relacionamentos de followers/following
CREATE TABLE IF NOT EXISTS `follower` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `follower_id` INT NOT NULL,
  `following_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_follow` (`follower_id`, `following_id`),
  INDEX `idx_following_id` (`following_id` ASC),
  CONSTRAINT `fk_follower_user_follower`
    FOREIGN KEY (`follower_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_follower_user_following`
    FOREIGN KEY (`following_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Tabela de listas salvas
CREATE TABLE IF NOT EXISTS `saved_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_saved` (`user_id`, `list_id`),
  INDEX `fk_saved_list_user_idx` (`user_id` ASC),
  INDEX `fk_saved_list_list_idx` (`list_id` ASC),
  CONSTRAINT `fk_saved_list_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_saved_list_list`
    FOREIGN KEY (`list_id`)
    REFERENCES `list` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Tabela de idiomas
CREATE TABLE IF NOT EXISTS `language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `language` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS `favorite` (
  `user_id` INT NOT NULL,
  `media_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `media_id`),
  INDEX `fk_user_has_media_media1_idx` (`media_id` ASC),
  INDEX `fk_user_has_media_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_media_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_media_media1`
    FOREIGN KEY (`media_id`)
    REFERENCES `media` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;