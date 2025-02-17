import { useQuery } from "@tanstack/react-query";
import me from "../../api/auth/me";

const useMe = () => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: (data: any) => me(data),
    enabled: Boolean(token),
  });
};
export default useMe;
