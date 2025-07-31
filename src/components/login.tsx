import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const handleLogin = () => {
    /* @ts-ignore */
    const url = `https://localhost:8080/?user=${user}&pass=${pass}`;
    // const response = fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // });
  }
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Enter UserName"
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={() => handleLogin()}>Login</button>
    </React.Fragment>
  )
}

export default Login;
