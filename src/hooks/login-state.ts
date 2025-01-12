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

  const apiURL = "http://localhost:5000/api";

  const isLoggedIn = useMemo(() => {
    return login !== null;
  }, [login]);

  const getCurrentUser = async () => {
    const res = await fetch(`${apiURL}/currentUser`, {
      method: "GET",
    });
    if (!isLoggedIn) {
      return 401;
    }
    return res;
  };

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

  const logout = () => {
    localStorage.removeItem(LoginProps.key);
    localStorage.removeItem(LoginProps.value);
    setLogin(null);
    setPassword(null);
  };

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    const res = await fetch(`${apiURL}/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    return res.status;
  };

  useEffect(() => {
    _setLogin(login, password);
  });

  return {
    login,
    isLoggedIn,
    _setLogin,
    getCurrentUser,
    logout,
    register,
  };
};
