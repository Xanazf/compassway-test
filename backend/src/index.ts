import express from "express";
import bodyParser from "body-parser";

const port = 5000;
const app = express();

// http://68.183.74.14:4005/api/
// basic auth
const baseURL = "http://68.183.74.14:4005/api";

async function sendRegister(
  username: string,
  password: string,
  email: string
) {
  const headers = new Headers({
    Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    "Content-Type": "application/json",
  });
  const body = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });
  const res = await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  return res.status;
}

async function getCurrentUser() {
  const res = await fetch(`${baseURL}users/current`, {
    method: "GET",
  });
  return res.json();
}

async function getEmails(limit: number, offset: number) {
  const res = await fetch(
    `${baseURL}/emails?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
    }
  );
  return res.json();
}

async function getEmail(id: number) {
  const res = await fetch(`${baseURL}/emails/${id}`, {
    method: "GET",
  });
  return res.json();
}

interface EmailModel {
  sender: number;
  recipient: string;
  subject: string;
  message: string;
}
async function createEmail(
  email: EmailModel,
  username: string,
  password: string
) {
  const headers = new Headers({
    Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    "Content-Type": "application/json",
  });
  const res = await fetch(`${baseURL}/emails`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(email),
  });
  return res.json();
}

async function deleteEmail(id: number) {
  const headers = new Headers({
    //Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    "Content-Type": "application/json",
  });
  const res = await fetch(`${baseURL}/emails/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  return res.status;
}

// API Routes
app.get("/api", (_, res) => {
  res.send("Is someone there?.. Must have been the wind.");
});

app.use(bodyParser.json());
app.post("/api/register", (req, res) => {
  const body = req.body;
  sendRegister(body.username, body.password, body.email).then(
    () => {
      res.status(201);
      res.send("user created");
    }
  );
});

app.get("/api/currentUser", (_, res) => {
  getCurrentUser().then(
    success => {
      res.status(200);
      res.send(success);
    },
    err => {
      console.log(err);
      res.status(500);
      res.send("error retrieving current user");
    }
  );
});

app.get("/api/emails/:limit/:offset", (req, res) => {
  const limit = req.params.limit;
  const offset = req.params.offset;
  if (
    !Number.isNaN(Number(limit)) &&
    !Number.isNaN(Number(offset))
  ) {
    getEmails(Number(limit), Number(offset)).then(
      success => {
        res.status(200);
        res.send(success);
      },
      err => {
        console.log(err);
        res.status(500);
        res.send("error retrieving emails");
      }
    );
  } else {
    res.status(400);
    res.send("limit and/or offset not a number");
  }
});

app.get("/api/email/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isNaN(Number(id))) {
    getEmail(Number(id)).then(
      success => {
        res.status(200);
        res.send(success);
      },
      err => {
        console.log(err);
        res.status(500);
        res.send("error retrieving emails");
      }
    );
  } else {
    res.status(400);
    res.send("id not a number");
  }
});

app.use(bodyParser);
app.post("/api/email", (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const emailBody = body.emailBody;
  if (emailBody && username && password) {
    createEmail(emailBody, username, password).then(
      success => {
        res.status(202);
        res.send(success);
      },
      err => {
        console.log(err);
        res.status(500);
        res.send("error retrieving emails");
      }
    );
  } else {
    res.status(400);
    res.send("body incorrect");
  }
});

app.delete("/api/email/:id", (req, res) => {
  const emailID = req.params.id;
  if (!Number.isNaN(Number(emailID))) {
    deleteEmail(Number(emailID)).then(
      success => {
        res.status(202);
        res.send(success);
      },
      err => {
        console.log(err);
        res.status(500);
        res.send("error deleting email");
      }
    );
  } else {
    res.status(400);
    res.send("email id not a number");
  }
});

// API Start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
