import AbstractView from './AbstractView.js';


export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }

  async getHtml() {
    return `
      <h1>404 Not Found</h1>
      <p>
        Your input is invalid!!
      </p>
    `;
  }
}