/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: nodeV2
-- ------------------------------------------------------
-- Server version	11.8.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `design`
--

DROP TABLE IF EXISTS `design`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `design` (
  `design_id` int(11) NOT NULL AUTO_INCREMENT,
  `variant_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `design_name` text NOT NULL,
  `gender` text NOT NULL,
  `date_added` date NOT NULL,
  PRIMARY KEY (`design_id`),
  KEY `product_id` (`product_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `design_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `design_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design`
--

LOCK TABLES `design` WRITE;
/*!40000 ALTER TABLE `design` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `design` VALUES
(1,2,1,'Striped','U','2025-06-01'),
(2,2,2,'Polka','F','2025-06-02'),
(3,4,3,'Plain','M','2025-06-03'),
(4,4,4,'Checked','U','2025-06-04'),
(5,6,5,'Embroidered','F','2025-06-05'),
(6,6,6,'Abstract','F','2025-06-06'),
(7,8,7,'Cartoon','M','2025-06-07'),
(8,8,8,'Graphic','U','2025-06-08'),
(9,10,9,'Camouflage','F','2025-06-09'),
(10,10,10,'Solid','M','2025-06-10'),
(11,12,11,'Floral','U','2025-06-11'),
(12,12,12,'Tiger','F','2025-06-12'),
(13,14,13,'Rainbow','M','2025-06-13'),
(14,14,14,'Skyline','U','2025-06-14'),
(15,16,15,'Gradient','F','2025-06-15'),
(16,16,16,'Galaxy','M','2025-06-16'),
(17,18,17,'Tie Dye','U','2025-06-17'),
(18,18,18,'Fade','F','2025-06-18'),
(19,20,19,'Retro','M','2025-06-19'),
(20,20,20,'Graffiti','U','2025-06-20');
/*!40000 ALTER TABLE `design` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  `season` text NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `product` VALUES
(1,'shirt','Summer'),
(2,'sweater','Winter'),
(3,'jacket','Winter'),
(4,'t-shirt','Summer'),
(5,'pant','All'),
(6,'frock','Spring'),
(7,'jeans','All'),
(8,'skirt','Summer'),
(9,'coat','Winter'),
(10,'shorts','Summer'),
(11,'kurta','All'),
(12,'blazer','Autumn'),
(13,'raincoat','Monsoon'),
(14,'dungaree','Spring'),
(15,'leggings','All'),
(16,'top','Summer'),
(17,'sweatshirt','Winter'),
(18,'pullover','Winter'),
(19,'hoodie','Winter'),
(20,'capri','Spring');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `design_id` int(11) NOT NULL,
  `colour` text NOT NULL,
  `size_group` text NOT NULL,
  `size` text NOT NULL,
  `stock` int(11) NOT NULL,
  `min_age` int(11) NOT NULL,
  `max_age` int(11) NOT NULL,
  `image_id` text NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `design_id` (`design_id`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`design_id`) REFERENCES `design` (`design_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `stock` VALUES
(1,1,'red','M','90-100-110',10,3,5,'1.jpg',1500),
(2,2,'blue','S','80-90-100',15,2,4,'2.jpg',500),
(3,3,'green','L','100-120-140',20,4,6,'3.jpg',1000),
(4,4,'yellow','M','90',8,5,8,'4.jpg',650),
(5,5,'black','XL','110',5,6,9,'5.jpg',800),
(6,6,'pink','S','80',12,2,5,'6.jpg',500),
(7,7,'white','L','100',14,4,7,'7.jpg',950),
(8,8,'grey','M','90',9,3,6,'8.jpg',650),
(9,9,'purple','S','85',7,3,5,'9.jpg',1000),
(10,10,'orange','XL','115',6,6,10,'10.jpg',800),
(11,11,'navy','M','90',10,3,6,'11.jpg',1500),
(12,12,'brown','S','80',11,2,4,'12.jpg',650),
(13,13,'cyan','L','100',16,5,9,'13.jpg',1500),
(14,14,'beige','M','90',13,3,6,'14.jpg',950),
(15,15,'maroon','XL','110',8,4,7,'15.jpg',800),
(16,16,'teal','S','85',9,2,5,'16.jpg',650),
(17,17,'lavender','L','100',7,4,8,'17.jpg',1500),
(18,18,'turquoise','M','90',10,3,6,'18.jpg',500),
(19,19,'olive','S','80',6,2,5,'19.jpg',1500),
(20,20,'mint','XL','115',5,6,9,'20.jpg',650);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `variant_id` int(11) NOT NULL AUTO_INCREMENT,
  `variant_name` text NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`variant_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `variant` VALUES
(1,'Slim Fit',1),
(2,'Regular Fit',2),
(3,'Oversized',3),
(4,'Half Sleeve',4),
(5,'Full Sleeve',5),
(6,'Casual',6),
(7,'Formal',7),
(8,'Ankle Length',8),
(9,'Waist Length',9),
(10,'Round Neck',10),
(11,'Collared',11),
(12,'Rain Proof',12),
(13,'Denim',13),
(14,'Printed',14),
(15,'Solid',15),
(16,'High Waist',16),
(17,'Loose Fit',17),
(18,'Crop',18),
(19,'Zippered',19),
(20,'Sleeveless',20);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-07-17 17:11:52
