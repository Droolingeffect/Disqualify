-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: localhost    Database: disqualify_db
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '914034d8-c5f5-11f0-8c3b-8d7bc1587540:1-23';

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `album` varchar(255) DEFAULT NULL,
  `artist` varchar(255) NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `duration` int DEFAULT '0',
  `file_path` varchar(500) DEFAULT '',
  `release_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES 
(1,'thank u, next','thank u, next','Ariana Grande','Pop',2019,'img/album_cover/arianagrande_thanku_next.png',208,'audio/songs/ariana_grande_thank_u,_next.mp3','2019-01-01',CURRENT_TIMESTAMP),
(2,'Cruel Summer','Lover','Taylor Swift','Pop',2019,'img/album_cover/taylorswift_lover.png',178,'audio/songs/taylor_swift_cruel_summer.mp3','2019-01-01',CURRENT_TIMESTAMP),
(3,'Hot','Hot','LE SSERAFIM','K-Pop',2025,'img/album_cover/lsrfm_hot.png',185,'audio/songs/le_sserafim_hot.mp3','2025-01-01',CURRENT_TIMESTAMP),
(4,'DtMF','Debí Tirar Más Fotos','Bad Bunny','Latin',2025,'img/album_cover/badbunny_debi.png',220,'audio/songs/bad_bunny_dtmf.mp3','2025-01-01',CURRENT_TIMESTAMP),
(5,'Without Me','The Eminem Show','Eminem','Hip-Hop',2002,'img/album_cover/eminem_theeminemshow.png',290,'audio/songs/eminem_without_me.mp3','2002-01-01',CURRENT_TIMESTAMP),
(6,'Yet To Come','Proof','BTS','K-Pop',2023,'img/album_cover/BTS_Proof.jpg',240,'audio/songs/bts_yet_to_come.mp3','2023-01-01',CURRENT_TIMESTAMP),
(7,'Baby Shark','Pinkfong Animal Songs','Pinkfong','Children',2017,'img/album_cover/pinkfong_babyshark.png',240,'audio/songs/pinkfong_baby_shark.mp3','2017-01-01',CURRENT_TIMESTAMP),
(8,'Kill Bill','SOS','SZA','R&B',2022,'img/album_cover/sza_killbill.png',240,'audio/songs/sza_kill_bill.mp3','2022-01-01',CURRENT_TIMESTAMP),
(9,'I Wanna Be Yours','AM','Arctic Monkeys','Indie',2013,'img/album_cover/arcticmonkeys_am.png',240,'audio/songs/arctic_monkeys_i_wanna_be_yours.mp3','2013-01-01',CURRENT_TIMESTAMP),
(10,'Thunderstruck','The Razors Edge','AC/DC','Rock',1990,'img/album_cover/acdc_therazorsedge.png',240,'audio/songs/ac_dc_thunderstruck.mp3','1990-01-01',CURRENT_TIMESTAMP),
(11,'Soft Promise','Soft Promise','Somniare','Sleep',2025,'img/album_cover/somniare_softpromise.png',240,'audio/songs/somniare_soft_promise.mp3','2025-01-01',CURRENT_TIMESTAMP),
(12,'Twinkle Twinkle Little Star','Twinkle Twinkle Little Star','Super Simple Songs','Children',2017,'img/album_cover/supersimplesongs.png',240,'audio/songs/super_simple_songs_twinkle_twinkle_little_star.mp3','2017-01-01',CURRENT_TIMESTAMP),
(13,'Winters Sleep','Winters Sleep','Escix V','Sleep',2024,'img/album_cover/escixv_wintersleep.png',240,'audio/songs/escix_v_winters_sleep.mp3','2024-01-01',CURRENT_TIMESTAMP),
(14,'Despacito','Despacito (featuring Daddy Yankee)','Luis Fonsi & Daddy Yankee','Latin',2017,'img/album_cover/despacito.png',240,'audio/songs/luis_fonsi_&_daddy_yankee_despacito.mp3','2017-01-01',CURRENT_TIMESTAMP),
(15,'Smells Like Teen Spirit','Nevermind','Nirvana','Alternative',1991,'img/album_cover/nirvana_nevermind.png',240,'audio/songs/nirvana_smells_like_teen_spirit.mp3','1991-01-01',CURRENT_TIMESTAMP),
(16,'Creep','Pablo Honey','Radioheads','Alternative',1993,'img/album_cover/radioheads_pablohoney.png',240,'audio/songs/radioheads_creep.mp3','1993-01-01',CURRENT_TIMESTAMP),
(17,'Wonderwall','(Whats the Story) Morning Glory?','Oasis','Indie',1995,'img/album_cover/oasis_morningglory.png',240,'audio/songs/oasis_wonderwall.mp3','1995-01-01',CURRENT_TIMESTAMP),
(18,'Not Like Us','Not Like Us','Kendrick Lamar','Hip-Hop',2024,'img/album_cover/kendricklamar_notlikeus.png',240,'audio/songs/kendrick_lamar_not_like_us.mp3','2024-01-01',CURRENT_TIMESTAMP),
(19,'Thinkin Bout You','channel ORANGE','Frank Ocean','R&B',2012,'img/album_cover/frankocean_channelorange.png',240,'audio/songs/frank_ocean_thinkin_bout_you.mp3','2012-01-01',CURRENT_TIMESTAMP),
(20,'Bohemian Rhapsody','Bohemian Rhapsody','Queen','Rock',1975,'img/album_cover/queen_bohemianrhapsody.png',240,'audio/songs/queen_bohemian_rhapsody.mp3','1975-01-01',CURRENT_TIMESTAMP);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 19:42:43
