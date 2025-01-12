import type { Dispatch, SetStateAction } from "react";

interface LoginProps {
  currUsername: string;
  currPassword: string;
  changeUsername: Dispatch<SetStateAction<string>>;
  changePassword: Dispatch<SetStateAction<string>>;
}

const LoginComponent: React.FC<LoginProps> = ({
  currUsername,
  currPassword,
  changeUsername,
  changePassword,
}) => {
  return (
    <>
      <div>
        <label
          className={`absolute ml-3 ${currUsername.length < 1 ? "opacity-30" : "opacity-0"}`}
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="log-username"
          name="username"
          type="text"
          className="px-3 rounded-md"
          value={currUsername}
          minLength={1}
          maxLength={150}
          onChange={e => changeUsername(e.target.value)}
        />
      </div>
      <div>
        <label
          className={`absolute ml-3 ${currPassword.length < 1 ? "opacity-30" : "opacity-0"}`}
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="log-password"
          name="password"
          type="password"
          className="px-3 rounded-md"
          value={currPassword}
          minLength={1}
          maxLength={128}
          onChange={e => changePassword(e.target.value)}
        />
      </div>
    </>
  );
};

export default LoginComponent;
