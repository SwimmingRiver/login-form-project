import { useMutation } from "@tanstack/react-query";
import { UserInterface } from "../../types/user";
import login from "../../api/auth/login";

const useLogin = () => {
  return useMutation({ mutationFn: (data: UserInterface) => login(data) });
};
export default useLogin;
