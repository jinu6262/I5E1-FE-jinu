/** @type {import('tailwindcss').Config} */
// 해당 파일을 통해 기본 스타일, 변수 등 웬만한 것을 커스텀 가능
// https://tailwindcss.com/docs/theme

module.exports = {
  // 모든 HTML 템플릿, JavaScript 구성 요소 및 Tailwind 클래스 이름이 포함된 기타 소스 파일에 대한 경로
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  // 색상 팔레트, 문자 배율, 글꼴, 중단점, 테두리 반경 값 등을 정의하는 곳입니다.
  theme: {
    //반응형 중단점
    screens: {
      sm: '480px',
      md: '1080px',
      lg: '1280px'
    },

    //전체 색상 팔레트를 사용자 정의
    colors: {
      //전역
      primary: '#0474e4',
      secondary: '#029104',
      btnDefault: '#d9d9d9',
      mainText: '#191919',
      subText: '#8e8e8e',

      //calendar 구성 색상
      'sun-day': '#ff5c5c',
      'satur-day': '#3d81ff',
      gray: '#D9D9D9',
      white: 'white',

      //enroll 구성 색상
      inputBorder: '#8E8E8E',

      //mypage 구성 색상
      'sub-primary': '#03A9F5',
      'gray-light': '#8e8e8e'
    },

    // 폰트 지정
    fontFamily: {
      Noto: ['Noto Sans KR', 'sans-serif'],
      Spoqa: ['Spoqa Han Sans Neo', 'sans-serif']
    }

    //전역 간격 및 크기 조정 척도를 사용자 정의
    // spacing: {}
  },
  plugins: []
}
