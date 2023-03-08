import { useEffect } from "react";
// import api from "../api/axiosApi";
import { cookie } from "../api/axiosApi";
import { accessToken } from "../recoil/user";
import { useRecoilState } from "recoil"
import { useAxios } from "../api/useAxios";

const { naver } = window as any;
const Welcome = () => {
  const [recoilAccessToken, setRecoilAccessToken, api] = useAxios()


  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "FL_dHs6b8BOH36DPExe3",
      callbackUrl: "http://localhost:5173/NaverCallBackPage",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "white", type: 1, height: "10" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const onClick = () => {
    api.get("accounts/testing/").then((res) => {
      console.log(res.data);
      setRecoilAccessToken(res.data.access_token)
    });
  };

  const onChecking = () => {
    api.get("accounts/goto401/").then((res) => console.log(res));
  };

  // const [recoilAccessToken, setRecoilAccessToken] = useRecoilState(accessToken);

  useEffect(() => {
    console.log(recoilAccessToken)
  }, [])

  return (
    <>
      <h1>Welcome입니다!</h1>
      <div id="naverIdLogin" />
      <button onClick={onClick}>Login</button>
      <button onClick={() => onChecking()}>Check</button>
    </>
  );
};

export default Welcome;
