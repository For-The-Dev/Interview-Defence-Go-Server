import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import User from "./components/UserInfo";

export default function Mypage({ accessToken, setIsLogin }) {
  const [githubUser, setGithubUser] = useState(null);
  const [serverResource, setServerResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logoutHandler = async () => {
    // TODO: /logout을 통해 사용자가 로그아웃되도록 구현하세요.
    // prop으로 받은 Access Token을 이용해 /logout 엔드포인트로 요청을 보내야합니다.
    // 요청이 성공했다면 isLogin 상태를 false로 업데이트해야 합니다.

    await axios
      .delete("http://localhost:4000/logout", { data: { accessToken } })
      .then((res) => {
        setIsLogin(false);
        // 토큰 초기화도 해야함.
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserinfo = async () => {
    console.log(accessToken);
    let data = await axios.post("http://localhost:4000/userinfo", {
      accessToken,
    });
    setGithubUser(data.data.githubUserData);
    setServerResource(data.data.serverResource);
    setIsLoading(false);
  };

  useEffect(() => {
    // TODO: /userinfo를 통해 사용자 정보를 받아오세요.
    // prop으로 받은 Access Token을 이용해 /userinfo 엔드포인트로 요청을 보내야합니다.
    // 응답으로 받은 데이터를 githubUser, serverResource의 상태로 업데이트해야합니다.
    // isLoading 상태를 false로 업데이트해야 합니다.
    getUserinfo();
  }, []);

  return (
    <>
      <div className="left-box">
        {!isLoading && (
          <span>
            {`${githubUser.login}`}님,
            <p>반갑습니다!</p>
          </span>
        )}
      </div>
      <div className="right-box">
        <div className="input-field">
          {isLoading ? (
            <Loading />
          ) : (
            <User
              githubUser={githubUser}
              serverResource={serverResource}
              logoutHandler={logoutHandler}
            />
          )}
        </div>
      </div>
    </>
  );
}
