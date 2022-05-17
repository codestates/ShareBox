CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT (now()), 
  `updatedDate` timestamp NOT NULL DEFAULT (now()) 

  -- 모바일번호추가해야됨 
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
  `updatedDate` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `postsId` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT (now()),
  `updatedDate` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `users_comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `usersId` int NOT NULL,
  `commentsId` int NOT NULL 
);

CREATE TABLE `users_posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT, 
  `usersId` int NOT NULL,
  `postsId` int NOT NULL
);

ALTER TABLE `comments` ADD FOREIGN KEY (`postsId`) REFERENCES `posts` (`id`);

ALTER TABLE `users_comments` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

ALTER TABLE `users_comments` ADD FOREIGN KEY (`commentsId`) REFERENCES `comments` (`id`);

ALTER TABLE `users_posts` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

ALTER TABLE `users_posts` ADD FOREIGN KEY (`postsId`) REFERENCES `posts` (`id`);

