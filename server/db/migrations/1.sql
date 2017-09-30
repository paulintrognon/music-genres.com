-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 30, 2017 at 05:36 PM
-- Server version: 10.1.26-MariaDB-0+deb9u1
-- PHP Version: 7.0.19-1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `title` varchar(100) NOT NULL,
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

INSERT INTO `tracks` (`id`, `serviceName`, `serviceTrackId`, `title`, `description`, `upvotes`, `createdAt`, `updatedAt`, `deletedAt`, `musicGenreId`) VALUES
(11, 'youtube', 'CD-E-LDc384', 'Metallica - Enter Sandman [Official Music Video]', 'Enter Sandman [Official Music Video]\nFrom the album \"Metallica\"\n\nDirector: Wayne Isham\nFilmed in June 1991 in Los Angeles, CA\nVideo Premiere Date: July 30, 1991\n\n© 1991 Metallica', 1, '2017-09-30 15:28:47', '2017-09-30 15:34:25', NULL, 1),
(13, 'youtube', 'XpZHUVjQydI', 'John Coltrane - Blue train', 'John Coltrane playing the amazing Blue train', 1, '2017-09-30 15:29:09', '2017-09-30 15:34:40', NULL, 2),
(14, 'youtube', 'vmDDOFXSgAs', 'Dave Brubeck - Take Five', 'Dave Brubeck - Take Five', 1, '2017-09-30 15:29:25', '2017-09-30 15:34:43', NULL, 2),
(15, 'youtube', 'sU1yg6_l0_4', 'Count Basie - April in Paris', '', 0, '2017-09-30 15:29:32', '2017-09-30 15:29:32', NULL, 2),
(16, 'youtube', '2G5rfPISIwo', 'Iron Maiden - The Trooper', 'You\'ll take my life but I\'ll take yours too\r\nYou\'ll fire your musket but I\'ll run you through\r\nSo when you\'re waiting for the next attack\r\nYou\'d better stand there\'s no turning back.\r\n\r\nThe Bugle sounds and the charge begins\r\nBut on this battlefield no one wins\r\nThe smell of acrid smoke and horses breath\r\nAs I plunge on into certain death.\r\n\r\nThe horse he sweats with fear we break to run\r\nThe mighty roar of the Russian guns\r\nAnd as we race towards the human wall\r\nThe screams of pain as my comrades fall.\r\n\r\nWe hurdle bodies that lay on the ground\r\nAnd the Russians fire another round\r\nWe get so near yet so far away\r\nWe won\'t live to fight another day.\r\n\r\nWe get so close near enough to fight\r\nWhen a Russian gets me in his sights\r\nHe pulls the trigger and I feel the blow\r\nA burst of rounds take my horse below.\r\n\r\nAnd as I lay there gazing at the sky\r\nMy body\'s numb and my throat is dry\r\nAnd as I lay forgotten and alone\r\nWithout a tear I draw my parting groan.', 1, '2017-09-30 15:29:41', '2017-09-30 15:34:47', NULL, 1),
(17, 'youtube', 'CSvFpBOe8eY', 'System Of A Down - Chop Suey!', 'System of a Down\'s official music video for \'Chop Suey!\'. Click to listen to System of a Down on Spotify: http://smarturl.it/SystemSpotify?IQid=SystemCS\n\nAs featured on Toxicity. Click to buy the track or album via\niTunes: http://smarturl.it/SystemToxicity?IQid=SystemCS\nGoogle Play: http://smarturl.it/CSGPlay?IQid=SystemCS\nAmazon: http://smarturl.it/ToxicityAmazon?IQid=SystemCS\n\nMore from System of a Down\nAerials: https://youtu.be/L-iepu3EtyE\nB.Y.O.B: https://youtu.be/zUzd9KyIDrM\nLonely Day: https://youtu.be/DnGdoEa1tPg\n\nMore great Alternative videos here: http://smarturl.it/Alternative00?IQid=SystemCS\n\nFollow System of a Down\nWebsite: http://www.systemofadown.com/\nFacebook: https://www.facebook.com/systemofadown\nTwitter: https://twitter.com/systemofadown\nInstagram: https://instagram.com/systemofadown/\n\nSubscribe to System of a Down on YouTube: http://smarturl.it/SYODSub?IQid=SystemCS\n\n---------\n\nLyrics:\n\nWake up (wake up)\nGrab a brush and put a little make-up\nHide the scars to fade away the shake-up (hide the scars to fade away the...)\nWhy\'d you leave the keys upon the table?\nHere you go create another fable\n\nYou wanted to\nGrab a brush and put a little makeup\nYou wanted to\nHide the scars to fade away the shake-up\nYou wanted to\nWhy\'d you leave the keys upon the table?\nYou wanted to\n\nI don\'t think you trust\nIn my self-righteous suicide\nI cry when angels deserve to die', 0, '2017-09-30 15:29:54', '2017-09-30 15:29:54', NULL, 1),
(18, 'youtube', 'StZcUAPRRac', 'Rammstein - Sonne (Official Video)', '► Website: http://www.rammstein.com\n► Shop: http://shop.rammstein.de\n\nPremiere: January 29,  2001\nShoot: 13th to 15th January,  2001\nLocation: Babelsberger Filmstudio, Potsdam\nDirector: Jörn Heitmann\nSingle: Sonne\nFrom the Album: Mutter\n\nThe video shoot for the song SONNE was produced in Potsdam at Babelsberger Filmstudios from the 13th to the 15th of January 2001. It was the first time Jörn Heitmann directed a Rammstein video.\n\nSONNE, the first single from the album MUTTER is released soon thereafter. Beside the original and an instrumental version of the song, the single contains the track ADIOS and two remixes by Clawfinger.\n\nBiography:\nRammstein was formed in 1993 by an ensemble of factory-weary proletarians raised in East Germany. They took their name (adding an \"m\") from the location of a German tragedy where 80 people were injured and killed as the result of a crash during an American Air Force air show. The literal translation of \"Ram Stein\" is a battering ram made of stone.\n\nWord of Rammstein\'s horror/romanticist blend of theater and music -  spread quickly - one-time Olympic swimmer Till Lindemann would sometimes sing entire songs engulfed in flame from head to toe. The band\'s first album, HERZELEID (English: Heartache), elaborated on the foundations set by the band\'s live reputation. Scaling the German charts, and remaining there until the release of the second Rammstein LP some two years later, the album also introduced the band to the world outside of the Germany/Switzerland/Austria region. \n\nAs Rammstein\'s second album, SEHNSUCHT (English: Longing), was released, the band was playing headlines shows across Europe to crowds of 10,000 to 30,000 people. SEHNSUCHT entered the German charts at number one immediately upon its release and came very close to doing the same in Austria and Switzerland. Within weeks, entries on other countries\' charts had SEHNSUCHT rubbing elbows with The Prodigy, Radiohead, and The Rolling Stones on Billboard\'s cumulative Eurochart. From there the fever spread, transcending any perceived language barrier. \n\nMUTTER followed in 2001, REISE, REISE in 2004, and the live collection VOLKERBALL in 2006. LIEBE IST FÜR ALLE DA followed in 2009. A limited edition of the album was packed in a metal suitcase that also housed six sex toys, one for each member of the band. \n~ Ed Nimmervoll, Rovi', 0, '2017-09-30 15:30:03', '2017-09-30 15:30:03', NULL, 1);

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
(1, '4f8963e7ab3003964f09fbe9d1b7af80a55a4dab7a40558c2bd03159b5dfe015', '2017-08-31 22:21:06', '2017-08-31 22:21:06', NULL, NULL),
(2, '2c75a6c1d8289e0ec0c10f7bdc6b6708efcb49a7f6b892ef5d879013bba0bdda', '2017-09-30 15:34:25', '2017-09-30 15:34:25', NULL, 11),
(3, '2c75a6c1d8289e0ec0c10f7bdc6b6708efcb49a7f6b892ef5d879013bba0bdda', '2017-09-30 15:34:40', '2017-09-30 15:34:40', NULL, 13),
(4, '2c75a6c1d8289e0ec0c10f7bdc6b6708efcb49a7f6b892ef5d879013bba0bdda', '2017-09-30 15:34:43', '2017-09-30 15:34:43', NULL, 14),
(5, '2c75a6c1d8289e0ec0c10f7bdc6b6708efcb49a7f6b892ef5d879013bba0bdda', '2017-09-30 15:34:47', '2017-09-30 15:34:47', NULL, 16);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
