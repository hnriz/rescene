-- Migração: Aumentar tamanho da coluna media-ids para suportar arrays JSON
-- Data: 2025-12-02
-- Problema: Ao adicionar múltiplos items a uma lista, o JSON excede 45 caracteres

USE rescene;

-- Alterar a coluna media-ids de VARCHAR(45) para LONGTEXT
ALTER TABLE `list` 
MODIFY COLUMN `media-ids` LONGTEXT NULL DEFAULT NULL;

-- Verificar alteração
SHOW COLUMNS FROM `list` WHERE Field = 'media-ids';
