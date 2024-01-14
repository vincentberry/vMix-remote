-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : remotevmix-db:3306
-- Généré le : dim. 14 jan. 2024 à 20:26
-- Version du serveur : 11.2.2-MariaDB-1:11.2.2+maria~ubu2204
-- Version de PHP : 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `remotevmix`
--

-- --------------------------------------------------------

--
-- Structure de la table `command`
--

CREATE TABLE `command` (
  `id` int(11) NOT NULL,
  `session_vmix` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `type` varchar(255) NOT NULL,
  `input` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `push_vmix` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `command`
--

INSERT INTO `command` (`id`, `session_vmix`, `date_time`, `type`, `input`, `duration`, `value`, `push_vmix`) VALUES
(23, 231862637, '2024-01-14 19:46:56', 'PreviewInput', '6967b840-1f56-4c1f-ac2d-41b96ca80161', '0', '0', 1),
(24, 231862637, '2024-01-14 19:49:56', 'PreviewInput', '6967b840-1f56-4c1f-ac2d-41b96ca80161', '0', '0', 1),
(25, 231862637, '2024-01-14 19:50:02', 'PreviewInput', '6a0116cc-0354-484f-888c-5bb17d74e68d', '0', '0', 1),
(26, 231862637, '2024-01-14 19:50:15', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(27, 231862637, '2024-01-14 19:50:22', 'OverlayInput1', '1', '0', '0', 1),
(28, 231862637, '2024-01-14 20:01:04', 'OverlayInput1', '1', '0', '0', 1),
(29, 231862637, '2024-01-14 20:02:02', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(30, 231862637, '2024-01-14 20:02:51', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(31, 231862637, '2024-01-14 20:06:40', 'PreviewInput', '53bb3770-aedc-47b3-848a-03c814eee485', '0', '0', 1),
(32, 231862637, '2024-01-14 20:06:47', 'OverlayInput1', '1', '0', '0', 1),
(33, 231862637, '2024-01-14 20:08:10', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(34, 231862637, '2024-01-14 20:08:33', 'PreviewInput', '6a0116cc-0354-484f-888c-5bb17d74e68d', '0', '0', 1),
(35, 231862637, '2024-01-14 20:08:47', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(36, 231862637, '2024-01-14 20:08:53', 'PreviewInput', 'd9e21b82-4034-4972-9b49-dabce41740cf', '0', '0', 1),
(37, 231862637, '2024-01-14 20:08:55', 'OverlayInput4', '20', '0', '0', 1),
(38, 231862637, '2024-01-14 20:09:37', 'PreviewInput', '53bb3770-aedc-47b3-848a-03c814eee485', '0', '0', 1),
(39, 231862637, '2024-01-14 20:09:46', 'PreviewInput', '033acb86-d611-4661-b947-af18e614d59e', '0', '0', 1),
(40, 231862637, '2024-01-14 20:10:01', 'OverlayInput1', '1', '0', '0', 1),
(41, 231862637, '2024-01-14 20:10:08', 'PreviewInput', '53bb3770-aedc-47b3-848a-03c814eee485', '0', '0', 1),
(42, 231862637, '2024-01-14 20:10:43', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(43, 231862637, '2024-01-14 20:11:32', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(44, 231862637, '2024-01-14 20:11:40', 'PreviewInput', '6967b840-1f56-4c1f-ac2d-41b96ca80161', '0', '0', 1),
(45, 231862637, '2024-01-14 20:12:09', 'PreviewInput', '3c28d664-d53c-416b-96e3-7df448c979f7', '0', '0', 1),
(46, 231862637, '2024-01-14 20:15:51', 'OverlayInput1', '1', '0', '0', 1),
(47, 231862637, '2024-01-14 20:16:01', 'PreviewInput', '6a0116cc-0354-484f-888c-5bb17d74e68d', '0', '0', 1),
(48, 231862637, '2024-01-14 20:22:04', 'PreviewInput', 'd08deba0-31d9-4615-acd0-eee7fea2e1a9', '0', '0', 1),
(49, 231862637, '2024-01-14 20:22:10', 'PreviewInput', '6357bb25-eb25-4554-b1b3-b3022b05d608', '0', '0', 1),
(50, 231862637, '2024-01-14 20:22:16', 'PreviewInput', '6a0116cc-0354-484f-888c-5bb17d74e68d', '0', '0', 1),
(51, 231862637, '2024-01-14 20:22:18', 'OverlayInput2', '3', '0', '0', 1),
(52, 231862637, '2024-01-14 20:24:07', 'PreviewInput', 'a34d89bd-10b6-43a4-9065-2cd95888b747', '0', '0', 1),
(53, 231862637, '2024-01-14 20:24:13', 'PreviewInput', '6357bb25-eb25-4554-b1b3-b3022b05d608', '0', '0', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `command`
--
ALTER TABLE `command`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `command`
--
ALTER TABLE `command`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
