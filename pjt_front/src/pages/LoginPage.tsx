import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import api from "../api/axiosApi";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, isError } = useMutation(
    (credentials: { email: String; password: String }) =>
      api({
        url: "accounts/testlogin/",
        method: "post",
        data: credentials,
      }).then((res) => {
        return res.data
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
