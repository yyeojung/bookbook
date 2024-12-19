## 241219

- base url 화면 할당, 메뉴 숨기기, router index.tsx로 이동
- 도서 리뷰 등록, 홈화면 책 데이터 가져오기

## 241218

- types 도서 타입 정리
- 로딩 컴포넌트 추가
- 상품 조회 api 가져오기

참고: https://blog.aladin.co.kr/openapi/category/29154402?communitytype=MyPaper

- 무한 스크롤 구현하기

참고: https://velog.io/@yunsungyang-omc/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-used-by-Intersection-Observer-2

## 241217

- 홈화면 UI 완료

## 241216

- themes.ts colors 삭제<br/>
  공통 컬러 app.css :root로 관리

## 241213 라이브러리 사용하기

- react-select 추가

드롭다운 커스텀
data/selectOption : 드롭다운 옵션 관리

- react-simple-star-rating 추가

components/common/StarRating.tsx
별점 컴포넌트 생성

- react-modal 추가

모달 레이아웃, 타입별 모달 추가

## 241205 cors 오류

~~ set the request's mode to 'no-cors' to fetch the resource with CORS disabled
알라딘 검색 api를 가져오는데 cors 정책 위반 오류 발생.

처음엔 https://cors-anywhere.herokuapp.com/ 을 이용했으나 일시적으로만 사용 가능한 방법이라
heroku 주소를 받아 해결.

참고: https://codemasterkimc.tistory.com/128
