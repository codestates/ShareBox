-- drop database ShareBox;
-- create database ShareBox;
-- mysql -u root -p < ./server/db/ShareBox.sql -DShareBox;
-- mysql -u root -p < server/db/seed.sql -DShareBox;
INSERT INTO
    `users` (
        `userId`,
        `email`,
        `password`,
        `country`,
        `mobile`
    )
VALUES
    (
        "kimcoding",
        "kimcoding@ShareBox.com",
        "1234",
        "영등포구",
        "010123456789"
    ),
    (
        "cheacoding",
        "cheacoding@ShareBox.com",
        "1234",
        "마포구",
        "010123456789"
    ),
    (
        "choecoding",
        "choecoding@ShareBox.com",
        "1234",
        "영등포구",
        "010123456789"
    ),
    (
        "leecoding",
        "leecoding@ShareBox.com",
        "1234",
        "강서구",
        "010123456789"
    );


INSERT INTO
    `posts` (
        `title`,
        `image`,
        `content`,
        `category`,
        `country`,
        `complete`
    )
VALUES
    (
        "닭가슴살 필요하신분 계신가요?",
        "http://ec2-3-34-122-9.ap-northeast-2.compute.amazonaws.com/images/닭가슴살.jpg",
        "ㅈㄱㄴ",
        "축산",
        "영등포구",
        false
    ),
    (
        "빵 필요하신분~????",
        "http://ec2-3-34-122-9.ap-northeast-2.compute.amazonaws.com/images/빵.jpg",
        "오늘 사왔습니다!!",
        "빵",
        "마포구",
        false
    ),
    (
        "오늘 저녁 삼겹살 필요하신 분??",
        "http://ec2-3-34-122-9.ap-northeast-2.compute.amazonaws.com/images/삼겹살.jpg",
        "요즘 돼지고기 비싸요 ㅠ",
        "축산",
        "영등포구",
        false
    ),
    (
        "고등어 필요하신 분있나요??",
        "http://ec2-3-34-122-9.ap-northeast-2.compute.amazonaws.com/images/고등어.jpg",
        "오늘 사서 신선합니다.",
        "수산",
        "강서구",
        false
    ),
    (
        "치킨 필요하신 분?",
        "http://ec2-3-34-122-9.ap-northeast-2.compute.amazonaws.com/images/치킨.jpg",
        "얼능가져가세요",
        "가공식품",
        "마포구",
        true
    ),
    (
        "배추 필요하신분 계신가요?",
        "http://ec2-3-34-122-9.ap-northeast-2.compute.amazonaws.com/images/배추.jpg",
        "요즘 야채 비싸요",
        "신선",
        "강서구",
        false
    );


INSERT INTO
    `comments` (`postsId`, `content`)
VALUES
    (1, "닭가슴살 저요!!"),
    (1, "닭가슴살 저도요!!"),
    (1, "닭가슴살 저도요!!"),
    (2, "빵 저요!!"),
    (2, "빵 저도요!!"),
    (2, "빵 저도요!!"),
    (3, "삼겹살 저요!!"),
    (3, "삼겹살 저도요!!"),
    (4, "저요!!"),
    (4, "저요!!"),
    (5, "저요!!"),
    (5, "저요!!"),
    (6, "저요!!"),
    (6, "저요!!");

INSERT INTO
    `users_comments` (`usersId`, `commentsId`)
VALUES
    (2, 1),
    (3, 2),
    (4, 3),
    (1, 4),
    (3, 5),
    (4, 6),
    (1, 7),
    (2, 8),
    (2, 9),
    (3, 10),
    (1, 11),
    (3, 12),
    (4, 13),
    (3, 14);


 INSERT INTO `users_posts` (`usersId`, `postsId`)
 VALUES
 (1, 1),
 (2, 2),
 (3, 3),
 (4, 4),
 (1, 5),
 (2, 6);

