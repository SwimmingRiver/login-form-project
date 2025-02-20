import { useQuery } from "@tanstack/react-query";
import me from "../../api/auth/me";

const useMe = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: (data: any) => me(data),
  });
};
export default useMe;
