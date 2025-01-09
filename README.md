# Compassway test task

## Conditions

basic auth:

- login credentials saved locally
- main page auth and registration
  - auth: username, password
  - registration: username, email, password
- successful auth redirects to main email page
  - saved session should redirect there without auth

main email page:

- current user card
  - username, email
  - endpoint `GET /users/current/`
- logout button
  - delete local data
  - redirect to auth page
- send email button
  - sender field (`<label>`:current user - email)
    - send id to the send endpoint
  - recipient field (`<input>`:email)
  - subject field (`<input>`:text)
  - email text field (`<input | textfield>`:text)
    - use draft.js or similar for rich text editing
  - SEND button
    - endpoint `POST /emails/`
- emails list
  - endpoint `GET /emails/`
    - count: total emails
    - next: next paginated page
    - previous: previous paginated page
    - result: email object
  - paginated pages
  - sorting unnecessary

## Install dependencies

```sh
npm install
# or
yarn install
```

## Run raw

```sh
npm run build && npm run start
# or
yarn build && yarn start
```

## Run with Docker

```sh
docker build -t viness .
docker run -p 3000:3000 -p 5000:5000 viness
```

## Develop

```sh
npm run dev
# or
yarn dev
```
