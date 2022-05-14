CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `country` varchar(255),
  `createdDate` timestamp,
  `modifiedDate` timestamp
);

CREATE TABLE `post` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int,
  `title` varchar(255),
  `picture` varchar(255),
  `content` varchar(255),
  `category` varchar(255),
  `country` varchar(255),
  `complete` boolean,
  `createdDate` timestamp,
  `modifiedDate` timestamp
);

CREATE TABLE `comment` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `postId` int,
  `userId` int,
  `content` varchar(255),
  `createdDate` timestamp,
  `modifiedDate` timestamp
);

ALTER TABLE `comment` ADD FOREIGN KEY (`postId`) REFERENCES `post` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `post` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
