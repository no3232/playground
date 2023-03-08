import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import api from "../api/axiosApi";
import { useAxios } from "../api/useAxios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [recoilAccessToken, setRecoilAccessToken, api] = useAxios()

  const { mutate, isLoading, isError } = useMutation(
    (credentials: { email: String; password: String }) =>
      api.post("accounts/testlogin/", credentials).then((res) => {
        setRecoilAccessToken(res.data.access_token);
        return res.data;
      })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  if (isError) {
    return <h1>Error!!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default LoginPage;
