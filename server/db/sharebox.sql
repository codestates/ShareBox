CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdDate` timestamp,
  `updatedDate` timestamp
);

CREATE TABLE `post` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `complete` boolean NOT NULL,
  `createdDate` timestamp,
  `updatedDate` timestamp
);

CREATE TABLE `comment` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `postId` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdDate` timestamp,
  `updatedDate` timestamp
);

CREATE TABLE `users_comment` (
  `usersId` int NOT NULL,
  `contentId` int NOT NULL
);

CREATE TABLE `users_post` (
  `usersId` int NOT NULL,
  `postId` int NOT NULL
);

ALTER TABLE `comment` ADD FOREIGN KEY (`postId`) REFERENCES `post` (`id`);

ALTER TABLE `users_comment` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

ALTER TABLE `users_comment` ADD FOREIGN KEY (`contentId`) REFERENCES `comment` (`id`);

ALTER TABLE `users_post` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

ALTER TABLE `users_post` ADD FOREIGN KEY (`postId`) REFERENCES `post` (`id`);
