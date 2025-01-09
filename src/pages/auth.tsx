import { useEffect, useState } from "react";

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

  //biome-ignore lint/correctness/useExhaustiveDependencies: needed on load
  useEffect(() => {
    if (loginUtil.isLoggedIn) {
      window.location.assign("/emails");
    }
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Login</h1>
          <div className="w-72 flex flex-col gap-3">
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="log-username"
                name="username"
                type="text"
                onChange={e => setLogin(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="log-password"
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onClick={() => submitLogin(login, password)}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="inline-block max-w-lg text-center justify-center">
          <div>
            Don't have an account yet?
            <h5>Register</h5>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
