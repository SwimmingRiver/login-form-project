import { useQuery } from "@tanstack/react-query";
import me from "../../api/auth/me";

const useMe = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: (data: any) => me(data),
    staleTime: 0,
    retry: 0,
  });
};
export default useMe;
