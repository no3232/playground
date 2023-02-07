// import 할 때 순수 자바스크립트에서는 js를 생략하지 말 것
import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import PostView from './views/PostView.js';
import Settings from './views/Settings.js';
import ErrorView from './views/ErrorView.js';

// 정규 표현식에 대해 더 알아보자
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
// 패스배리어블, 배리어블 라우팅
const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]]
  }));
}

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

const router = async () => {
  // /posts/:id
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings },
    { path: "/404", view: ErrorView },
  ];

  // 잠재적 일치에 대해 각 경로를 테스트
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      // 라우터 경로가 일치하는가?
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
  
  // 매치 되는 경로가 정의 되지 않았을 경우 default로 이동
  // 이를 이용해서 404페이지를 띄울 수 있다고 생각
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: [location.pathname]
    }
  }

  // 위 쪽에서 import한 새로운 view class로 객체를 생성
  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
};

// 뒤로 가기 할 때도 router 실행
// router를 통해서 view에서 보여주는 것을 변경 할 것이기 때문에
window.addEventListener("popstate", router)


// https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event
// HTML문서를 불러올때 router를 실행
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link")) {
      e.preventDefault();
      // history를 사용해서 SPA처럼 사용 됨
      // How??
      // https://developer.mozilla.org/ko/docs/Web/API/History_API
      // https://developer.mozilla.org/ko/docs/Web/API/History/pushState
      navigateTo(e.target.href);
    }
  })
  router();
});
