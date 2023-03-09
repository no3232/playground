import React, { useState, useCallback, useEffect } from "react";

const RealLogin = () => {
  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "이메일을 입력하세요",
    password: "비밀번호를 입력하세요",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value.trim() };
    });
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(1)
    setTouched((prev) => {
      return { ...prev, [e.target.name]: true };
    });
  };

  const validate = useCallback(() => {
    const errors = {
      email: "",
      password: "",
    };
    if (!userValue.email) {
      errors.email = "이메일을 입력하세요";
    }
    if (!userValue.password) {
      errors.password = "비밀번호를 입력하세요";
    }
    return errors;
  }, [userValue]);

  useEffect(() => {
    validate()
  }, [validate])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) {
      return alert(JSON.stringify(newErrors));
    }

    alert(JSON.stringify(userValue));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="userId">아이디</label>
        <input
          type="text"
          id="userId"
          name="email"
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        {touched.email && errors.email && <span>{errors.email}</span>}
        <br />
        <label htmlFor="userPassword">비밀번호</label>
        <input
          type="password"
          id="userPassword"
          name="password"
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        {touched.password && errors.password && <span>{errors.password}</span>}
        <br />

        <br />
        <button>로그인</button>
      </form>
    </>
  );
};

export default RealLogin;
