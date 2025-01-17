import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useLogin from "../../hooks/auth/useLogin";
import { UserInterface } from "../../types/user";
import axios from "axios";
function LoginForm() {
  type Inputs = {
    useremail: string;
    password: string;
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutate, isSuccess } = useLogin();
  const onSubmit: SubmitHandler<any> = (data: UserInterface) => {
    mutate(data);
  };
  if (isSuccess) {
    navigate("/");
  }
  const onFetchNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&code=qwe&redirect_uri=http://localhost:3000/redirect`;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>login form</span>
      <input
        {...register("useremail", {
          required: "이메일은 필수 입력 항목입니다.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "유효한 이메일 형식이 아닙니다.",
          },
        })}
      />

      <input
        type="password"
        {...register("password", {
          required: "비밀번호는 필수 입력 항목입니다.",
          minLength: {
            value: 8,
            message: "비밀번호는 최소 8자 이상이어야 합니다.",
          },
          validate: {
            containsNumber: (value) =>
              /[0-9]/.test(value) || "비밀번호에 숫자가 포함되어야 합니다.",
            containsUppercase: (value) =>
              /[A-Z]/.test(value) || "비밀번호에 대문자가 포함되어야 합니다.",
          },
        })}
      />

      <button type="submit">submit</button>
      <Link to={"/signup"}>sign up</Link>
      <button type="button" onClick={onFetchNaverLogin}>
        naver
      </button>
    </form>
  );
}

export default LoginForm;
