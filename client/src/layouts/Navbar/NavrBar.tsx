import { Box } from "@chakra-ui/react";

import useMe from "../../hooks/auth/useMe";
import useLogout from "../../hooks/auth/useLogout";
import { Link } from "@chakra-ui/react";
const NavBar = () => {
  const { data } = useMe();
  const { mutate } = useLogout();
  const token = localStorage.getItem("accessToken");
  const onClick = () => {
    mutate();
  };
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
      {data && token ? (
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
