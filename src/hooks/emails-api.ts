export interface EmailModel {
  sender: number;
  recipient: string;
  subject: string;
  message: string;
}

export const useEmail = () => {
  const apiURL = "http://localhost:5000/api";

  const getEmail = async (id: number) => {
    const res = await fetch(`${apiURL}/email/${id}`, {
      method: "GET",
    });
    return res;
  };

  const getEmails = async (limit: number, offset: number) => {
    const res = await fetch(
      `${apiURL}/emails/${limit}/${offset}`,
      {
        method: "GET",
      }
    );

    return res;
  };

  const createEmail = async (
    email: EmailModel,
    username: string,
    password: string
  ) => {
    const res = await fetch(`${apiURL}/email`, {
      method: "POST",
      body: JSON.stringify({
        emailBody: email,
        username: username,
        password: password,
      }),
    });
    return res;
  };

  const deleteEmail = async (id: number) => {
    const res = await fetch(`${apiURL}/email/${id}`, {
      method: "DELETE",
    });
    return res;
  };

  return {
    getEmail,
    getEmails,
    createEmail,
    deleteEmail,
  };
};
