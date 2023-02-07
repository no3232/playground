// 리액트의 클래스 컴포넌트와 똑같은 형식인데?
export default class {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = title
  }

  async getHtml() {
    return "";
  }
}