import type { Dispatch, SetStateAction } from "react";

interface RegisterProps {
  currUsername: string;
  currPassword: string;
  currEmail: string;
  changeUsername: Dispatch<SetStateAction<string>>;
  changePassword: Dispatch<SetStateAction<string>>;
  changeEmail: Dispatch<SetStateAction<string>>;
}

const RegisterComponent: React.FC<RegisterProps> = ({
  currUsername,
  currPassword,
  currEmail,
  changeUsername,
  changePassword,
  changeEmail,
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
          id="reg-username"
          required
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
          id="reg-password"
          name="password"
          type="password"
          required
          className="px-3 rounded-md"
          value={currPassword}
          minLength={1}
          maxLength={128}
          onChange={e => changePassword(e.target.value)}
        />
      </div>
      <div>
        <label
          className={`absolute ml-3 ${currEmail.length < 1 ? "opacity-30" : "opacity-0"}`}
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          required
          className="px-3 rounded-md"
          value={currEmail}
          maxLength={254}
          onChange={e => changeEmail(e.target.value)}
        />
      </div>
    </>
  );
};

export default RegisterComponent;
