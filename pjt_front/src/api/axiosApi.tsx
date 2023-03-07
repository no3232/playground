import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export {cookie}

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    // "Access-Control-Allow-Origin": "http://127.0.0.1:8000", // 서버 domain
  },
  withCredentials: true,
});

// 쿠키
// inercrptors: then 또는 catch로 처리되기 전에 요청과 응답을 가로채서 사용
api.interceptors.request.use(function (config) {
  const user = cookie.get('accessToken');
  // 유저가 없을 시 토큰 null처리
  // refreshToken은 httponly를 사용할 것 같으니 제외
  if (!cookie.get('accessToken')) {
    config.headers["Authorization"] = null;
    // config.headers["refreshToken"] = null;
    return config;
  }
  config.headers["Authorization"] = `Bearer ${cookie.get('accessToken')}`;
  // config.headers["refreshToken"] = refreshToken;
  return config;
});

// 401시에 처리
// 리스폰스 받을 때 401이 발생한다면

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      try {
        const originalRequest = error.config;
        const data = await api.get("accounts/access/");
        if (data) {
          const accessToken = data.data.access_token;
          cookie.remove("accessToken");
          cookie.set("accessToken", accessToken, { path: "/" });
          originalRequest.headers["Authorization"] = `Bearer ${cookie.get(
            "accessToken"
          )}`;
          return await api.request(originalRequest);
        }
      } catch (error) {
        cookie.remove("accessToken");
        console.log(error);

        // 로그아웃 후에 메인페이지로 이동
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;

// // 로컬스토리지
// // inercrptors: then 또는 catch로 처리되기 전에 요청과 응답을 가로채서 사용
// api.interceptors.request.use(
//     function (config) {
//         // 로컬스토리지에서 유저에 관한 것을 가져옴
//         const user = localStorage.getItem('user');
//         // 유저가 없을 시 토큰 null처리
//         // refreshToken은 httponly를 사용할 것 같으니 제외
//         if (!user) {
//             config.headers["accessToken"] = null;
//             // config.headers["refreshToken"] = null;
//             return config
//         }
//         const { accessToken, refreshToken } = JSON.parse(user)
//         config.headers["accessToken"] = accessToken;
//         // config.headers["refreshToken"] = refreshToken;
//         return config
//     }
// )

// // 401시에 처리
// // 리스폰스 받을 때 401이 발생한다면

// api.interceptors.response.use(
//     function (response) {
//         return response
//     },
//     async function (error) {
//       if (error.response && error.response.status === 401) {
//           try {
//               const originalRequest = error.config;
//               const data = await api.get('auth/refreshtoken')
//               if (data) {
//                   const {accessToken, refreshToken} = data.data
//                   localStorage.removeItem('user')
//                   localStorage.setItem('user', JSON.stringify(data.data, ['accessToken']))
//                 //   localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
//                   originalRequest.headers['accessToken'] = accessToken;
//                 //   originalRequest.headers['refreshToken'] = refreshToken;
//                   return await api.request(originalRequest);
//                   }
//           } catch (error){
//               localStorage.removeItem('user');
//               console.log(error);
//           }
//           return Promise.reject(error)
//       }
//       return Promise.reject(error)
//     }
// )
