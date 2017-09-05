-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 04, 2017 at 12:08 PM
-- Server version: 5.5.55-0+deb8u1
-- PHP Version: 7.0.19-1~dotdeb+8.1

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music-genres`
--

-- --------------------------------------------------------

DROP TABLE IF EXISTS `music_genres`;
DROP TABLE IF EXISTS `tracks`;
DROP TABLE IF EXISTS `votes`;

-- --------------------------------------------------------

--
-- Table structure for table `music_genres`
--

CREATE TABLE `music_genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `music_genres`
--

INSERT INTO `music_genres` (`id`, `name`, `slug`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Metal', 'metal', '2017-08-31 22:06:06', '2017-08-31 22:06:06', NULL),
(2, 'Jazz', 'jazz', '2017-08-31 22:11:19', '2017-08-31 22:11:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `id` int(11) NOT NULL,
  `serviceName` varchar(30) NOT NULL,
  `serviceTrackId` varchar(255) NOT NULL,
  `upvotes` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `musicGenreId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `serviceName`, `serviceTrackId`, `upvotes`, `createdAt`, `updatedAt`, `deletedAt`, `musicGenreId`) VALUES
(1, 'youtube', 'CD-E-LDc384', 3, '2017-08-31 22:07:19', '2017-08-31 22:21:06', NULL, 1),
(2, 'youtube', 'XpZHUVjQydI', 0, '2017-08-31 22:11:36', '2017-08-31 22:11:37', NULL, 2),
(3, 'youtube', 'vmDDOFXSgAs', 5, '2017-08-31 22:13:12', '2017-08-31 22:13:13', NULL, 2),
(4, 'youtube', 'sU1yg6_l0_4', 2, '2017-08-31 22:13:45', '2017-08-31 22:13:45', NULL, 2),
(5, 'youtube', '2G5rfPISIwo', 1, '2017-08-31 22:19:07', '2017-08-31 22:19:07', NULL, 1),
(6, 'youtube', 'CSvFpBOe8eY', 12, '2017-08-31 22:19:26', '2017-08-31 22:19:26', NULL, 1),
(7, 'youtube', 'StZcUAPRRac', 2, '2017-08-31 22:19:44', '2017-08-31 22:19:44', NULL, 1),
(8, 'youtube', '6DPhFpZW5a8', 0, '2017-08-31 22:20:51', '2017-08-31 22:20:51', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `userHash` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `trackId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `userHash`, `createdAt`, `updatedAt`, `deletedAt`, `trackId`) VALUES
(1, '4f8963e7ab3003964f09fbe9d1b7af80a55a4dab7a40558c2bd03159b5dfe015', '2017-08-31 22:21:06', '2017-08-31 22:21:06', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `music_genres`
--
ALTER TABLE `music_genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `music_genres_name` (`name`),
  ADD UNIQUE KEY `music_genres_slug` (`slug`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tracks_musicGenreId_foreign_idx` (`musicGenreId`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votes_trackId_foreign_idx` (`trackId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music_genres`
--
ALTER TABLE `music_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`musicGenreId`) REFERENCES `music_genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tracks_musicGenreId_foreign_idx` FOREIGN KEY (`musicGenreId`) REFERENCES `music_genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`trackId`) REFERENCES `tracks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `votes_trackId_foreign_idx` FOREIGN KEY (`trackId`) REFERENCES `tracks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
