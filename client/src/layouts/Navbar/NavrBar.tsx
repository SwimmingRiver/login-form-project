import { Box } from "@chakra-ui/react";

import useMe from "../../hooks/auth/useMe";
import useLogout from "../../hooks/auth/useLogout";
import { Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
const NavBar = () => {
  const { data } = useMe();
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useLogout();
  const navigate = useNavigate();
  const onClick = () => {
    mutate();
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      queryClient.setQueryData(["myInfo"], null); //TODO: 쿼리값을 강제로 초기화해도 되는지에 대해서 공부 필요
    }
  }, [isSuccess, navigate, queryClient]);
  return (
    <Box
      bg="#0d9488"
      w="100%"
      p="4"
      color="white"
      display="flex"
      justifyContent="space-between"
      gap="50px"
    >
      <Link href="/">Home</Link>
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
