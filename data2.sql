-- MySQL dump 10.13  Distrib 8.0.29, for macos12.4 (arm64)
--
-- Host: localhost    Database: Fundraising-web3
-- ------------------------------------------------------
-- Server version	8.0.29


--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `googleId` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `picture` varchar(200) NOT NULL,
  `wallet` varchar(200) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/* ALTER TABLE `User` ADD INDEX(`id`); */
/* ALTER TABLE `User` CHANGE `id` `id` INT NOT NULL AUTO_INCREMENT; */


--
-- Dumping data for table `User`
--

INSERT INTO `User` VALUES ('107317821299623244533','corinna','bleak517@gmail.com','https://i5.walmartimages.com/asr/1ae8d3a4-9a95-40c4-8b59-090338be0076.1d29ef1683638805f23e262834666084.jpeg','0x');

/* ('113959860576199220566','柯又文','kyw0424.mg08@nycu.edu.tw','https://lh3.googleusercontent.com/a/ALm5wu0K3MgbVPSc0USI8Fwlz7zC4llZwEn3fTobgNwa=s96-c','0x') */
/* ('117807131360917337263','莫比','mobby424@gmail.com','https://lh3.googleusercontent.com/a/ALm5wu0Lb2Un-JFue3mz-SAh0idfzJB6vEoIFJCKlCLh=s96-c','0x') */
