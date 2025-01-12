import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSignUp from "../../hooks/user/useSignUp";
import { UserInterface } from "../../types/user";
import { useNavigate } from "react-router-dom";

function SignUp() {
  type Inputs = {
    useremail: string;
    password: string;
    passwordCheck: string;
    username: string;
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isSuccess } = useSignUp();
  const onSubmit: SubmitHandler<Inputs> = (data: UserInterface) => {
    mutate(data);
  };
  if (isSuccess) {
    navigate("/");
  }
  const isCheckpassword = watch("password");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>SignUp</span>
      <div>
        <label>Email</label>
        <input
          {...register("useremail", {
            required: "이메일은 필수 입력 항목입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "유효한 이메일 형식이 아닙니다.",
            },
          })}
        />
        {errors.useremail && <p>{errors.useremail.message}</p>}
      </div>
      <div>
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
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <input
        type="password"
        {...register("passwordCheck", {
          required: "비밀번호 확인은 필수 입력 항목입니다.",
          validate: (value) =>
            value === isCheckpassword || "비밀번호가 일치하지 않습니다.",
        })}
      />
      {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}
      <input
        placeholder="username"
        {...register("username", { required: true })}
      />
      <button type="submit">sign up</button>
    </form>
  );
}

export default SignUp;
