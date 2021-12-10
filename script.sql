CREATE TABLE `server`.`produtos` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `cod_produto` VARCHAR(20) NOT NULL,
  `descricao` VARCHAR(60) NOT NULL,
  `preco` FLOAT NOT NULL DEFAULT 0,
  `data_cadastro` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id_produto`));