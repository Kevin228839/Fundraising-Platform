-- MySQL dump 10.13  Distrib 8.0.29, for macos12.4 (arm64)
--
-- Host: localhost    Database: Fundraising-web3
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `ProjectList`
--

DROP TABLE IF EXISTS `ProjectList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProjectList` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_admin` varchar(200) NOT NULL,
  `project_name` varchar(200) NOT NULL,
  `project_category` varchar(200) NOT NULL,
  `project_caption` varchar(200) NOT NULL,
  `project_start_time` datetime NOT NULL,
  `project_end_time` datetime NOT NULL,
  `project_target_amount` int NOT NULL,
  `project_detail` varchar(200) NOT NULL,
  `project_image` varchar(200) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProjectList`
--

LOCK TABLES `ProjectList` WRITE;
/*!40000 ALTER TABLE `ProjectList` DISABLE KEYS */;
INSERT INTO `ProjectList` VALUES (1,'動物之家','動物愛心捐款','動保','一起為流浪犬出一份心力！一起為流浪犬出一份心力！一起為流浪犬出一份心力！一起為流浪犬出一份心力！','2022-09-01 00:00:00','2022-10-01 00:00:00',1000000,'我們期望透過穩定、持續的方式為流浪犬提供一個安心的棲息地。建造友善的動物之家以及提供人道的關懷。讓愛狗狗的你成為贊助者吧！','https://images.unsplash.com/photo-1516280287949-2747a3304a2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2092&q=80'),(2,'環保王','環保餐具','環境','使用環保餐具降低環境污染','2022-09-01 00:00:00','2022-10-01 00:00:00',1000000,'你知道全世界一天產出多少垃圾嗎，環保餐具的推出可以為地球減輕負擔～快選擇好用、好清洗的環保產品。','https://images.unsplash.com/photo-1557687790-902ede7ab58c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvJTIwZnJpZW5kbHklMjBwcm9kdWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60'),(3,'創意小屋','電腦包','配備','方便收納線材的電腦包','2022-09-02 00:00:00','2022-10-04 00:00:00',100000,'防潑水又好用的電腦包，方便收納外表精美！','https://media.istockphoto.com/photos/backpack-with-supplies-picture-id1204667528?b=1&k=20&m=1204667528&s=170667a&w=0&h=e7bXi09fJl_Pt3aBPiQIqkFtgzDHoJQ8e7K_5xomCUI='),(4,'水壺工廠','水壺','生活','兼具外型及功能的水壺，由連續創業家推出','2022-09-15 00:00:00','2022-10-15 00:00:00',100000,'可以輕鬆收納、適合外出、旅遊、上課、運動。','https://images.unsplash.com/photo-1544003484-3cd181d17917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'),(5,'手錶小舖','運動手錶','生活','記錄心律以及每日的健走數目','2022-09-19 00:00:00','2022-11-19 00:00:00',1000000,'能夠上山下海的手錶。適合潛水愛好者，附帶衛星定位功能。','https://images.unsplash.com/photo-1517463700628-5103184eac47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80');
/*!40000 ALTER TABLE `ProjectList` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-20  0:54:21
