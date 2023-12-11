-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: public
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Pizza'),(2,'Lanche'),(3,'Bebida'),(4,'Açai'),(5,'Sorvete');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rua` varchar(255) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `complemento` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `usuarioId` int DEFAULT NULL,
  `numero` varchar(255) NOT NULL,
  `cep` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_82bec04bb9fadadad0a33cb0c43` (`usuarioId`),
  CONSTRAINT `FK_82bec04bb9fadadad0a33cb0c43` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'Rua Tapir','Centro','Apto 107','Pato Branco','AM',4,'1285','85503-371'),(2,'Rua Carlos Kummer','Bairro Universitário','Uceff','Itapiranga','SC',5,'100','89896000'),(3,'Rua Carlos Kummer','Bairro Universitário','Uceff','Itapiranga','SC',6,'100','89896000'),(4,'Rua Carlos Kummer','Bairro Universitário','Uceff','Itapiranga','SC',7,'100','89896000');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioId` int DEFAULT NULL,
  `enderecoId` int DEFAULT NULL,
  `valor_total` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `data_pedido` datetime NOT NULL,
  `usuarioEmpresaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d9798d0c7be0b11327770799621` (`enderecoId`),
  KEY `FK_440272d326db467ee25802678e8` (`usuarioId`),
  KEY `FK_1cca68ee1e6e2ed1ffb89205bf5` (`usuarioEmpresaId`),
  CONSTRAINT `FK_1cca68ee1e6e2ed1ffb89205bf5` FOREIGN KEY (`usuarioEmpresaId`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_440272d326db467ee25802678e8` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_d9798d0c7be0b11327770799621` FOREIGN KEY (`enderecoId`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (3,4,1,100,'ENVIADO','2023-11-25 16:01:23',1),(4,5,2,100,'EM_PREPARACAO','2023-11-25 16:01:23',1),(5,6,3,100,'EM_PREPARACAO','2023-11-25 16:01:23',1),(6,4,1,100,'LIDO','2023-11-25 16:01:23',1),(7,NULL,1,552,'NAO_LIDO','2023-12-08 19:21:11',1);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_item`
--

DROP TABLE IF EXISTS `pedido_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantidade` int NOT NULL,
  `pedidoId` int DEFAULT NULL,
  `produtoId` int DEFAULT NULL,
  `valor` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f184ca9c5c640a3ff3be75c5698` (`pedidoId`),
  KEY `FK_a5fa4d8535f139ea38876630d30` (`produtoId`),
  CONSTRAINT `FK_a5fa4d8535f139ea38876630d30` FOREIGN KEY (`produtoId`) REFERENCES `produto` (`id`),
  CONSTRAINT `FK_f184ca9c5c640a3ff3be75c5698` FOREIGN KEY (`pedidoId`) REFERENCES `pedido` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_item`
--

LOCK TABLES `pedido_item` WRITE;
/*!40000 ALTER TABLE `pedido_item` DISABLE KEYS */;
INSERT INTO `pedido_item` VALUES (1,1,3,1,100),(2,1,4,1,100),(3,1,5,1,100),(4,1,6,1,100),(5,4,7,1,100),(6,4,7,2,14),(7,6,7,3,16);
/*!40000 ALTER TABLE `pedido_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `is_ativo` tinyint NOT NULL DEFAULT '1',
  `categoriaId` int DEFAULT NULL,
  `valor` int NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8a1e81267ae184590ce1ee9a39b` (`categoriaId`),
  KEY `FK_4b195f5c993eebeca45e468d4c1` (`usuario_id`),
  CONSTRAINT `FK_4b195f5c993eebeca45e468d4c1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_8a1e81267ae184590ce1ee9a39b` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,'Pizza Calabresa',1,1,100,1),(2,'Cachorro-Quente',1,2,14,1),(3,'Açai pequeo',1,4,16,1),(4,'Pizza Alho e Oleo',0,1,100,1),(5,'Sorvete de menta',1,5,4,1),(6,'Coca-Cola',0,3,12,1);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `enderecoId` int DEFAULT NULL,
  `cpf_cnpj` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2863682842e688ca198eb25c12` (`email`),
  KEY `FK_6f962678dc18e5ec715e370e95e` (`enderecoId`),
  CONSTRAINT `FK_6f962678dc18e5ec715e370e95e` FOREIGN KEY (`enderecoId`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Restaurante FastFood','123','restaurantefastfood@gmail.com',NULL,'22.393.581/0001-01','(63) 2769-8916'),(4,'','123','',1,'094.671.910-16','49984221527'),(5,'Cliente 2','123','teste1@gmail.com',2,'499.977.910-29','(61) 3408-4873'),(6,'Cliente 3','123','teste2@gmail.com',3,'343.860.940-16','(68) 2393-0553'),(7,'Cliente 4','123','teste3@gmail.com',4,'418.577.610-14','(82) 2177-7305'),(10,'Restaurante FastFood 1','123','restaurantefastfood1@gmail.com',NULL,'22.393.581/0001-01','(63) 2769-8916'),(11,'Restaurante FastFood 2','123','restaurantefastfood2@gmail.com',NULL,'22.393.581/0001-01','(63) 2769-8916'),(12,'Restaurante FastFood 3','123','restaurantefastfood3@gmail.com',NULL,'22.393.581/0001-01','(63) 2769-8916');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'public'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 22:58:06
