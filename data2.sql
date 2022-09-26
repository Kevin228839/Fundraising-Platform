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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `picture` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ProjectList`
--

INSERT INTO `User` VALUES (1,'kevin','kev776522.mg08@nycu.edu.tw','https://static.wikia.nocookie.net/disney/images/9/99/Profile-_Kevin.png/revision/latest?cb=20190414091213'),(2,'corinna','bleak517@gmail.com','https://i5.walmartimages.com/asr/1ae8d3a4-9a95-40c4-8b59-090338be0076.1d29ef1683638805f23e262834666084.jpeg'),(3,'jessica','a0989961190@gmail.com','https://worldwideexperience.com/wp-content/uploads/2020/06/Backup-for-original-945x385.jpg')

-- Dump completed on 2022-09-20  0:54:21
