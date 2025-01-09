import { Route, Routes } from "react-router-dom";

import IndexPage from "@pages/index";
import AuthPage from "@pages/auth";
import EmailsPage from "@pages/emails";

function App() {
  return (
    <Routes>
      <Route
        element={<IndexPage />}
        path="/"
      />
      <Route
        element={<AuthPage />}
        path="/auth"
      />
      <Route
        element={<EmailsPage />}
        path="/emails"
      />
    </Routes>
  );
}

export default App;
