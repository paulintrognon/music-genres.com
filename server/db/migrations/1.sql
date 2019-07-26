-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 26, 2019 at 04:07 AM
-- Server version: 10.1.38-MariaDB-0+deb9u1
-- PHP Version: 7.1.30-2+0~20190710.21+debian9~1.gbp011d3c

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

--
-- Table structure for table `musicGenreParents`
--

CREATE TABLE `musicGenreParents` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `musicGenreId` int(11) NOT NULL,
  `ParentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `musicGenres`
--

CREATE TABLE `musicGenres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `musicGenreTracks`
--

CREATE TABLE `musicGenreTracks` (
  `upvotes` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `trackId` int(11) NOT NULL,
  `musicGenreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `id` int(11) NOT NULL,
  `playerName` varchar(255) NOT NULL,
  `playerTrackId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `upvotes` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `trackId` int(11) DEFAULT NULL,
  `musicGenreId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `musicGenreParents`
--
ALTER TABLE `musicGenreParents`
  ADD PRIMARY KEY (`musicGenreId`,`ParentId`),
  ADD KEY `ParentId` (`ParentId`);

--
-- Indexes for table `musicGenres`
--
ALTER TABLE `musicGenres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `musicGenres_name_unique` (`name`),
  ADD UNIQUE KEY `musicGenres_slug_unique` (`slug`);

--
-- Indexes for table `musicGenreTracks`
--
ALTER TABLE `musicGenreTracks`
  ADD PRIMARY KEY (`trackId`,`musicGenreId`),
  ADD KEY `musicGenreId` (`musicGenreId`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trackId` (`trackId`),
  ADD KEY `musicGenreId` (`musicGenreId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `musicGenres`
--
ALTER TABLE `musicGenres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `musicGenreParents`
--
ALTER TABLE `musicGenreParents`
  ADD CONSTRAINT `musicGenreParents_ibfk_1` FOREIGN KEY (`musicGenreId`) REFERENCES `musicGenres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `musicGenreParents_ibfk_2` FOREIGN KEY (`ParentId`) REFERENCES `musicGenres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `musicGenreTracks`
--
ALTER TABLE `musicGenreTracks`
  ADD CONSTRAINT `musicGenreTracks_ibfk_1` FOREIGN KEY (`trackId`) REFERENCES `tracks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `musicGenreTracks_ibfk_2` FOREIGN KEY (`musicGenreId`) REFERENCES `musicGenres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`trackId`) REFERENCES `tracks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`musicGenreId`) REFERENCES `musicGenres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
