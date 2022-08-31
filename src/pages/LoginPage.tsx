import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      console.log("increasing counter");
      setCounter((prev) => (prev += 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(
      "this is like component did update,but it is for specific dependencies"
    );
  }, [counter]);

  return (
    <div data-testid="login-page">
      <h1>Login Page {counter}</h1>
    </div>
  );
};

export default LoginPage;
