CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT (now()), -- 수정
  `updatedDate` timestamp NOT NULL DEFAULT (now())  -- 수정
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int NOT NULL,
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
  `postId` int NOT NULL,
  `userId` int NOT NULL, -- 추가
  `content` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT (now()),
  `updatedDate` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `users_comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT, -- 수정
  `usersId` int NOT NULL,
  `commentId` int NOT NULL 
);

CREATE TABLE `users_posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT, -- 수정
  `usersId` int NOT NULL,
  `postId` int NOT NULL
);

ALTER TABLE `comments` ADD FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

-- ALTER TABLE `users_comments` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

-- ALTER TABLE `users_comments` ADD FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`);

-- ALTER TABLE `users_posts` ADD FOREIGN KEY (`usersId`) REFERENCES `users` (`id`);

-- ALTER TABLE `users_posts` ADD FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

