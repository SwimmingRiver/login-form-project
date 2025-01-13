import { useMutation } from "@tanstack/react-query";
import React from "react";
import signUp from "../../api/user/signUp";
import { UserInterface } from "../../types/user";

const useSignUp = () => {
  return useMutation({ mutationFn: (data: UserInterface) => signUp(data) });
};

export default useSignUp;
