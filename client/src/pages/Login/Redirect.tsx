import axios from "axios";
import React, { useEffect } from "react";

function Redirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const fetchOauth = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/naver`,
      {
        code,
      },
      { withCredentials: true }
    );

    if (res.status === 201) {
      window.location.href = "/";
    }
  };
  useEffect(() => {
    fetchOauth();
  }, []);
  return <div>Redirect</div>;
}

export default Redirect;
