import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useLogin from "../../hooks/auth/useLogin";
import { UserInterface } from "../../types/user";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "../../components/ui/dialog";

import { Button, Stack, Input, Box } from "@chakra-ui/react";

function LoginForm() {
  type Inputs = {
    useremail: string;
    password: string;
  };

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
    window.location.href = "/";
  }
  const onFetchNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&code=qwe&redirect_uri=http://localhost:3000/redirect`;
  };
  return (
    <DialogRoot open={true} size="cover">
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <span>login form</span>
          </DialogHeader>
          <DialogBody>
            <Stack>
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
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              width="100%"
              height="20vh"
            >
              <Button width="100%" type="submit">
                submit
              </Button>
              <Button width="100%" type="button" onClick={onFetchNaverLogin}>
                naver
              </Button>

              <Link to={"/signup"}>sign up</Link>
            </Box>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

export default LoginForm;
