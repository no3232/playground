import AbstractView from './AbstractView.js';

// 리액트 클래스 컴포넌트에서 오버라이드 하는 것과 유사
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }
  // 서버 측에서 이 html을 바로 렌더링 하고 싶을 수도 있기 때문에 async를 사용
  // 서버 사이드 렌더링(SSR)도 포함 될 수 있다.
  // react에서 jsx로 리턴 해주는 것을 똑같이 한다고 생각하면 될 듯
  async getHtml() {
    return `
      <h1>Welcome back, Dom</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis sodales massa, et tempor ligula. Suspendisse scelerisque metus et nulla pretium mollis. Donec id mollis tortor. Integer sed lorem vel felis dictum faucibus. Nam laoreet est ac lorem efficitur, et bibendum mauris placerat. Vivamus sed varius mauris. Morbi gravida vitae justo ac consequat. Sed vulputate dictum orci in maximus. In euismod ligula nec tempor tristique. Maecenas dui lorem, sagittis quis turpis nec, malesuada volutpat tellus. Ut iaculis nec leo a elementum.
      </p>
      <p>
        <a href='/posts' data-link >View recent posts</a>
      </p>
    `;
  }
}