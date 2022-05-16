CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdDate` timestamp,
  `updatedDate` timestamp
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `complete` boolean NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT (now()),
  `updatedDate` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `postsId` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT (now()),
  `updatedDate` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `users_comments` (
  `usersId` int,
  `commentsId` int 
);

CREATE TABLE `users_posts` (
  `usersId` int NOT NULL,
  `postsId` int NOT NULL
);

ALTER TABLE `comments` ADD FOREIGN KEY (`postsId`) REFERENCES `posts` (`id`);

ALTER TABLE `users_comments` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

ALTER TABLE `users_comments` ADD FOREIGN KEY (`commentsId`) REFERENCES `comments` (`id`);

ALTER TABLE `users_posts` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

ALTER TABLE `users_posts` ADD FOREIGN KEY (`postsId`) REFERENCES `posts` (`id`);
