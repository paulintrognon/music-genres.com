-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 30, 2017 at 07:33 PM
-- Server version: 10.1.26-MariaDB-0+deb9u1
-- PHP Version: 7.0.19-1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `music-genres`
--

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
(1, 'Jazz', 'jazz', '2017-09-30 17:17:51', '2017-09-30 17:17:51', NULL),
(2, 'Swing', 'swing', '2017-09-30 17:19:18', '2017-09-30 17:19:18', NULL),
(3, 'Electro', 'electro', '2017-09-30 17:19:55', '2017-09-30 17:19:55', NULL),
(4, 'Electro-Swing', 'electro-swing', '2017-09-30 17:21:23', '2017-09-30 17:21:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `music_genre_parents`
--

CREATE TABLE `music_genre_parents` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `musicGenreId` int(11) NOT NULL,
  `ParentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `music_genre_parents`
--

INSERT INTO `music_genre_parents` (`createdAt`, `updatedAt`, `musicGenreId`, `ParentId`) VALUES
('2017-09-30 17:19:18', '2017-09-30 17:19:18', 2, 1),
('2017-09-30 17:21:23', '2017-09-30 17:21:23', 4, 2),
('2017-09-30 17:21:23', '2017-09-30 17:21:23', 4, 3);

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
  `deletedAt` datetime DEFAULT NULL,
  `musicGenreId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `playerName`, `playerTrackId`, `title`, `description`, `upvotes`, `createdAt`, `updatedAt`, `deletedAt`, `musicGenreId`) VALUES
(1, 'youtube', 'sU1yg6_l0_4', 'Count Basie - April in Paris', '', 1, '2017-09-30 17:26:21', '2017-09-30 17:32:36', NULL, 1),
(2, 'youtube', 'fRgWBN8yt_E', 'Ray Charles - Georgia On My Mind (The Orginal Song From The Albom)', 'Ray Charles was born in Georgia and moved to Florida as a child. At the age of 5 he began losing his sight gradually, and by age 7 is completely blind. Florida, he studied at St. Augustine deaf and blind, where he first learned to play the piano. He then moved to Seattle, where he began to be published as a musician.\r\n\r\nTowards the end of 60\'s style and diversity to record the songs of rock and roll and pop. Since issued dozens of diverse and successful records, including songs he composed his own songs and performance of others. Ray Charles went on to appear in the 80s and 90s, until his death in 2004. This year was the biographical film \"Ray, starring Jamie Foxx, who won the Oscar on the embodiment of Charles.\r\n\r\nRay learned his life in various entanglements, especially Bahtamachrotho drugs and betrayals of his wife. Ray also worked for the struggle against racism in Achssarab appear in Georgia which was the separation of races, not the black spectators were allowed to enter the hall with those bricks. A few years later cherished him the state of Georgia when she became the song (written by Hoagy Bix Eviidrebak Carmyekel gained fame performing Ray Charles), \"George Yeh my heart\" (georgia on my mind) be counted official.', 0, '2017-09-30 17:27:29', '2017-09-30 17:27:29', NULL, 1),
(3, 'youtube', 'fhyhP_5VfKM', 'Sing Sing Sing - Benny Goodman', 'Sing Sing Sing - Benny Goodman', 0, '2017-09-30 17:28:16', '2017-09-30 17:28:16', NULL, 2);

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
(1, '2c75a6c1d8289e0ec0c10f7bdc6b6708efcb49a7f6b892ef5d879013bba0bdda', '2017-09-30 17:32:36', '2017-09-30 17:32:36', NULL, 1);

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
-- Indexes for table `music_genre_parents`
--
ALTER TABLE `music_genre_parents`
  ADD PRIMARY KEY (`musicGenreId`,`ParentId`),
  ADD KEY `ParentId` (`ParentId`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `musicGenreId` (`musicGenreId`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trackId` (`trackId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music_genres`
--
ALTER TABLE `music_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `music_genre_parents`
--
ALTER TABLE `music_genre_parents`
  ADD CONSTRAINT `music_genre_parents_ibfk_1` FOREIGN KEY (`musicGenreId`) REFERENCES `music_genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `music_genre_parents_ibfk_2` FOREIGN KEY (`ParentId`) REFERENCES `music_genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`musicGenreId`) REFERENCES `music_genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`trackId`) REFERENCES `tracks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
