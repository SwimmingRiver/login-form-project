import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSignUp from "../../hooks/user/useSignUp";
import { UserInterface } from "../../types/user";
import { useNavigate } from "react-router-dom";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Button, Stack, Input, Link } from "@chakra-ui/react";

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
    <DialogRoot open={true}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <Link href="/">Home</Link>
            <span>sign up</span>
          </DialogHeader>
          <DialogBody>
            <Stack>
              <div>
                <Input
                  placeholder="email"
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
                <Input
                  placeholder="password"
                  type="password"
                  {...register("password", {
                    required: "비밀번호는 필수 입력 항목입니다.",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 최소 8자 이상이어야 합니다.",
                    },
                    validate: {
                      containsNumber: (value) =>
                        /[0-9]/.test(value) ||
                        "비밀번호에 숫자가 포함되어야 합니다.",
                      containsUppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "비밀번호에 대문자가 포함되어야 합니다.",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <Input
                placeholder="password check"
                type="password"
                {...register("passwordCheck", {
                  required: "비밀번호 확인은 필수 입력 항목입니다.",
                  validate: (value) =>
                    value === isCheckpassword ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />
              {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}
              <Input
                placeholder="username"
                {...register("username", { required: true })}
              />
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Button type="submit">sign up</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

export default SignUp;
