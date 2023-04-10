## api 종류

- 로그인,로그아웃 로직

  - 로그인 : /auth/github (window.location.assign을 이용해 주소로 이동해야함.)
  - 로그아웃 : /logout (get)

- 유저 관련 로직
  - 유저 정보 조회 : /user (get)
  - 유저 질문 전체 조회(페이지네이션) : /user/questions?page=1&limit=10 (get)
    - 필수 : page,limit,authorization(요청 헤더)
  - 유저 질문 등록(post) : /user/editQuestion
    - 필수 : question, answer (요청바디), authorization (요청 헤더)
  - 질문 상세 조회 : /user/question/:id
    - 필수 : authorization (요청 헤더), id
