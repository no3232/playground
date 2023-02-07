import AbstractView from './AbstractView.js';

// 리액트 클래스 컴포넌트에서 오버라이드 하는 것과 유사
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }
  // 서버 측에서 이 html을 바로 렌더링 하고 싶을 수도 있기 때문에 async를 사용
  // 서버 사이드 렌더링(SSR)도 포함 될 수 있다.
  // react에서 jsx로 리턴 해주는 것을 똑같이 한다고 생각하면 될 듯
  async getHtml() {
    return `
      <h1>Posts</h1>
      <p>
        You are viewing Posts!
      </p>
    `;
  }
}