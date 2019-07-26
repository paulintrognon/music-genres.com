-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 26, 2019 at 07:26 AM
-- Server version: 10.1.38-MariaDB-0+deb9u1
-- PHP Version: 7.1.30-2+0~20190710.21+debian9~1.gbp011d3c

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
-- Table structure for table `MusicGenreParents`
--

CREATE TABLE `MusicGenreParents` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `musicGenreId` int(11) NOT NULL,
  `ParentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `MusicGenres`
--

CREATE TABLE `MusicGenres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `MusicGenreTracks`
--

CREATE TABLE `MusicGenreTracks` (
  `upvotes` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `trackId` int(11) NOT NULL,
  `musicGenreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Tracks`
--

CREATE TABLE `Tracks` (
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
-- Table structure for table `Votes`
--

CREATE TABLE `Votes` (
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
-- Indexes for table `MusicGenreParents`
--
ALTER TABLE `MusicGenreParents`
  ADD PRIMARY KEY (`musicGenreId`,`ParentId`),
  ADD KEY `ParentId` (`ParentId`);

--
-- Indexes for table `MusicGenres`
--
ALTER TABLE `MusicGenres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `musicGenres_name_unique` (`name`),
  ADD UNIQUE KEY `musicGenres_slug_unique` (`slug`);

--
-- Indexes for table `MusicGenreTracks`
--
ALTER TABLE `MusicGenreTracks`
  ADD PRIMARY KEY (`trackId`,`musicGenreId`),
  ADD KEY `musicGenreId` (`musicGenreId`);

--
-- Indexes for table `Tracks`
--
ALTER TABLE `Tracks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Votes`
--
ALTER TABLE `Votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trackId` (`trackId`),
  ADD KEY `musicGenreId` (`musicGenreId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MusicGenres`
--
ALTER TABLE `MusicGenres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Tracks`
--
ALTER TABLE `Tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Votes`
--
ALTER TABLE `Votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `MusicGenreParents`
--
ALTER TABLE `MusicGenreParents`
  ADD CONSTRAINT `MusicGenreParents_ibfk_1` FOREIGN KEY (`musicGenreId`) REFERENCES `MusicGenres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `MusicGenreParents_ibfk_2` FOREIGN KEY (`ParentId`) REFERENCES `MusicGenres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `MusicGenreTracks`
--
ALTER TABLE `MusicGenreTracks`
  ADD CONSTRAINT `MusicGenreTracks_ibfk_1` FOREIGN KEY (`trackId`) REFERENCES `Tracks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `MusicGenreTracks_ibfk_2` FOREIGN KEY (`musicGenreId`) REFERENCES `MusicGenres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Votes`
--
ALTER TABLE `Votes`
  ADD CONSTRAINT `Votes_ibfk_1` FOREIGN KEY (`trackId`) REFERENCES `Tracks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Votes_ibfk_2` FOREIGN KEY (`musicGenreId`) REFERENCES `MusicGenres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
