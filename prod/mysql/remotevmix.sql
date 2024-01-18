SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `remotevmix`;
CREATE DATABASE IF NOT EXISTS `remotevmix` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `remotevmix`;

CREATE TABLE `command` (
  `id` int(11) NOT NULL,
  `session_vmix` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `command` varchar(255) NOT NULL,
  `input` varchar(255) DEFAULT '0',
  `duration` varchar(255) DEFAULT '0',
  `value` varchar(255) DEFAULT '0',
  `push_vmix` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `vmix` (
  `id` int(11) NOT NULL,
  `session_vmix` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `session_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `command`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `command`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;


GRANT SELECT, INSERT, UPDATE, DELETE ON `remotevmix`.* TO 'user'@'%';
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
