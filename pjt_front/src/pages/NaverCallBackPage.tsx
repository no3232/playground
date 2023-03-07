import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


const NaverCallBackPage = () => {
  const location = useLocation();
  const [token, setToken] = useState<String>("");


  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split("=")[1].split("&")[0];
    setToken(token);
  };

  

  useEffect(() => {
    getNaverToken();
  }, []);

  

  return (
    <>
      <p>로그인 완료된 페이지입니다!!!!!!!!!!!!!!!!!</p>
      {token ? <p>token: {token}</p> : null}
    </>
  );
};

export default NaverCallBackPage;
