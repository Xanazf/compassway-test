import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import { title } from "@components/primitives";
import DefaultLayout from "@layouts/default";
import { useLogin } from "@src/hooks/login-state";

export default function AuthPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginUtil = useLogin();

  function submitLogin(login: string, password: string) {
    loginUtil._setLogin(login, password);
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
            <div>
              <label
                className={`absolute ml-3 ${login.length < 1 ? "opacity-30" : "opacity-0"}`}
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="log-username"
                name="username"
                type="text"
                className="px-3 rounded-md"
                onChange={e => setLogin(e.target.value)}
              />
            </div>
            <div>
              <label
                className={`absolute ml-3 ${password.length < 1 ? "opacity-30" : "opacity-0"}`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="log-password"
                name="password"
                type="password"
                className="px-3 rounded-md"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              onClick={() => submitLogin(login, password)}
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="inline-block max-w-lg text-center justify-center">
          <div>
            Don't have an account yet?
            <br />
            <Button>Register</Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
