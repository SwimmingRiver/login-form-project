import { useQuery } from "@tanstack/react-query";
import auth from "../../api/auth/auth";
const useAuth = () => {
  return useQuery({
    queryKey: ["useAuth"],
    queryFn: auth,
  });
};
export default useAuth;
