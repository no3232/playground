import axios, { AxiosInstance } from "axios";
import { useRecoilState } from "recoil";
import { accessToken } from "../recoil/user";

export function useAxios(): AxiosInstance {
  const [recoilAccessToken, setRecoilAccessToken] = useRecoilState(accessToken);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      // "Access-Control-Allow-Origin": "http://127.0.0.1:8000", // 서버 domain
    },
    withCredentials: true,
  });

  // 리코일
  // inercrptors: then 또는 catch로 처리되기 전에 요청과 응답을 가로채서 사용
  // 로컬스토리지를 사용해야 하긴 하는데 리코일 값은 다른페이지를 갔다옴을 통해 새로운 값으로 업데이트 되는 것을 확인
  // 애초에 setItem을 리코일을 통해서 하니까
  // 우선은 로컬 스토리지를 기반
  api.interceptors.request.use(async function (config) {
    // 유저가 없을 시 토큰 null처리
    // refreshToken은 httponly를 사용할 것 같으니 제외
    const localAccessToken = await JSON.parse(
      localStorage.getItem("accessToken") || ""
    );
    if (!localAccessToken) {
      config.headers["Authorization"] = null;
      // config.headers["refreshToken"] = null;
      return config;
    }
    config.headers["Authorization"] = `Bearer ${localAccessToken}`;
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
          const data = await api.get("accounts/testrefresh/");
          if (data) {
            const accessToken = data.data.access_token;
            console.log(accessToken);
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            setRecoilAccessToken(accessToken);
            originalRequest.headers.authorization = `Bearer ${accessToken}`;

            console.log(`Bearer ${accessToken}`);
            return await api.request(originalRequest);
          }
        } catch (error) {
          setRecoilAccessToken("");
          console.log(error);

          // 로그아웃 후에 메인페이지로 이동
        }
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return api;
}
