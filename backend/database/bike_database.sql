SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `bk_bike` (
  `id` int(11) UNSIGNED NOT NULL,
  `uid` int(10) UNSIGNED NOT NULL,
  `title` varchar(120) NOT NULL,
  `description` text NOT NULL,
  `photos` text NOT NULL,
  `location` point NOT NULL,
  `deposit` decimal(8,2) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `available` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `bk_bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(11) NOT NULL,
  `bid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `bk_file` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(256) NOT NULL,
  `path` varchar(80) NOT NULL,
  `md5` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `bk_order` (
  `id` int(10) UNSIGNED NOT NULL,
  `rid` int(10) UNSIGNED NOT NULL COMMENT 'renter id',
  `oid` int(10) UNSIGNED NOT NULL COMMENT 'owner id',
  `bid` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `deposit` decimal(10,2) NOT NULL,
  `location` point NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `return_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `bk_user` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'User ID',
  `gid` varchar(40) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Google ID',
  `fname` varchar(80) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Full Name',
  `gname` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Given Name',
  `xname` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Family Name',
  `head` varchar(4096) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Head Image',
  `email` varchar(80) COLLATE utf8_unicode_ci NOT NULL COMMENT 'E-Mail',
  `password` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


ALTER TABLE `bk_bike`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location` (`location`(25)),
  ADD KEY `uid` (`uid`),
  ADD KEY `available` (`available`);

ALTER TABLE `bk_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `bid` (`bid`);

ALTER TABLE `bk_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `md5` (`md5`);

ALTER TABLE `bk_order`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `bk_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gid` (`gid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `password` (`password`);


ALTER TABLE `bk_bike`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `bk_bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `bk_file`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `bk_order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `bk_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'User ID';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
