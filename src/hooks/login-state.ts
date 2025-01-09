import { useEffect, useMemo, useState } from "react";

const LoginProps = {
  key: "username",
  value: "password",
} as const;

export const useLogin = () => {
  const [login, setLogin] = useState(() => {
    const storedLogin = localStorage.getItem(LoginProps.key);

    return storedLogin || null;
  });
  const [password, setPassword] = useState(() => {
    const storedPassword = localStorage.getItem(LoginProps.value);

    return login ? storedPassword || null : null;
  });

  const isLoggedIn = useMemo(() => {
    return login !== null;
  }, [login]);

  const _setLogin = (
    login: string | null,
    password: string | null
  ) => {
    if (login && password) {
      localStorage.setItem(LoginProps.key, login);
      localStorage.setItem(LoginProps.value, password);
      setLogin(login);
      setPassword(password);
    }
  };

  const logout = (login: string) => {
    localStorage.removeItem(LoginProps.key);
    localStorage.removeItem(LoginProps.value);
    setLogin(null);
    setPassword(null);
  };

  useEffect(() => {
    _setLogin(login, password);
  });

  return {
    login,
    isLoggedIn,
    _setLogin,
    logout,
  };
};
