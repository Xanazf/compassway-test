import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import { title } from "@components/primitives";
import DefaultLayout from "@layouts/default";
import { useLogin } from "@src/hooks/login-state";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [doRegister, setDoRegister] = useState(false);

  const loginUtil = useLogin();

  function changeScreen() {
    setUsername("");
    setPassword("");
    setEmail("");
    setDoRegister(!doRegister);
  }

  function submitLogin(username: string, password: string) {
    loginUtil._setLogin(username, password);
  }

  function submitRegister(
    username: string,
    password: string,
    email: string
  ) {
    loginUtil.register(email, username, password).then(status => {
      if (status === 201) {
        submitLogin(username, password);
      } else {
        console.log("register failed");
      }
    });
  }

  useEffect(() => {
    if (loginUtil.isLoggedIn) {
      window.location.assign("/emails");
    }
  }, [loginUtil.isLoggedIn]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Login</h1>
          <div className="w-72 flex flex-col gap-3 mt-3">
            {doRegister ? (
              <RegisterComponent
                currEmail={email}
                currUsername={username}
                currPassword={password}
                changeEmail={setEmail}
                changePassword={setPassword}
                changeUsername={setUsername}
              />
            ) : (
              <LoginComponent
                currUsername={username}
                currPassword={password}
                changeUsername={setUsername}
                changePassword={setPassword}
              />
            )}
            <Button
              type="submit"
              onClick={() =>
                doRegister
                  ? submitRegister(username, password, email)
                  : submitLogin(username, password)
              }
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="inline-block max-w-lg text-center justify-center">
          <div>
            {doRegister
              ? "already have an account?"
              : "don't have an account yet?"}
            <br />
            <Button onClick={() => changeScreen()}>
              {doRegister ? "Login" : "Register"}
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
