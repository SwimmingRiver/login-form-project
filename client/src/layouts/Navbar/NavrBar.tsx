import { Box } from "@chakra-ui/react";

import useMe from "../../hooks/auth/useMe";
import useLogout from "../../hooks/auth/useLogout";
import { Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../store/authStore";
import mainImage from "../../asset/main.png";
const NavBar = () => {
  const { data } = useMe();
  const setUser = useUserStore((state) => state.setUser);
  const { user, clearUser } = useUserStore();

  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useLogout();
  const navigate = useNavigate();
  const onClick = () => {
    mutate();
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      clearUser();
      queryClient.setQueryData(["myInfo"], null); //TODO: 쿼리값을 강제로 초기화해도 되는지에 대해서 공부 필요
    }
  }, [isSuccess, navigate, queryClient]);
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);
  return (
    <Box
      bg="#FF914D"
      w="100%"
      p="4"
      color="white"
      display="flex"
      justifyContent="space-between"
      gap="50px"
    >
      <Link href="/">
        <img src={mainImage} style={{ width: "40px" }} />
        <span>Home</span>
      </Link>
      {data ? (
        <div
          style={{
            display: "flex",
            width: "55%",
            justifyContent: "space-between",
          }}
        >
          <span>{data.user?.username}</span>
          <button onClick={onClick}>logout</button>
        </div>
      ) : (
        <Link href="/login">login</Link>
      )}
    </Box>
  );
};
export default NavBar;
