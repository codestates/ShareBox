INSERT INTO `users` (`userId`, `email`, `password`, `country`)
 VALUES 
 ("kimcoding", "kimcoding@ShareBox.com", "1234", "영등포구"), 
 ("cheacoding", "cheacoding@ShareBox.com", "1234", "마포구"), 
 ("choecoding", "choecoding@ShareBox.com", "1234", "영등포구"), 
 ("leecoding", "leecoding@ShareBox.com", "1234", "강서구");

INSERT INTO `post` (`userId`, `title`, `picture`, `content`, `category`, `country`, `complete`)
 VALUES 
 (1, "닭가슴살 필요하신분 계신가요?", "http://localhost:4000/images/닭가슴살.jpg", "ㅈㄱㄴ", "축산", "영등포구", false), 
 (2, "빵 필요하신분~????", "http://localhost:4000/images/빵.jpg", "오늘 사왔습니다!!", "빵", "마포구", false), 
 (3, "오늘 저녁 삼겹살 필요하신 분??", "http://localhost:4000/images/삼겹살.jpg", "요즘 돼지고기 비싸요 ㅠ", "축산", "영등포구", false), 
 (4, "고등어 필요하신 분있나요??", "http://localhost:4000/images/고등어.jpg", "오늘 사서 신선합니다.", "수산", "강서구", false), 
 (1, "치킨 필요하신 분?", "http://localhost:4000/images/치킨.jpg", "얼능가져가세요", "가공식품", "마포구", true), 
 (3, "배추 필요하신분 계신가요?", "http://localhost:4000/images/배추.jpg", "요즘 야채 비싸요", "신선", "강서구", false);