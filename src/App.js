import React, { useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Pages/Auth/Login";
import LoginOpinsys from "./pages/Pages/Auth/OpinsysAuth";

const Error404 = React.lazy(() => import('./pages/Pages/Errors/404'));

const history = React.lazy(() => import('./history'));

const config = require('./config.json');

async function isLoggedIn() {
  if (!localStorage.getItem('access')) {
    return false;
  }
  try {
    await axios.post(`${config.apiBase}/api/v1/user/info`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    return true;
  } catch(e) {
    if (e.response && (e.response.data.message === "The JWT has expired" || e.response.data.message === "The JWT is invalid")) {
      try {
        const res = await axios.post(`${config.apiBase}/api/v1/auth/refresh`, {
          refresh_token: localStorage.getItem('refresh')
        })
        localStorage.setItem('access', res.data.accessToken);
        return true;
      } catch(e) {
        localStorage.clear();
        return false;
      }
    } else {
      localStorage.clear();
    }
    return false;
  }
}

function App() {
  const [loggedIn, setLoggedIn] = React.useState(null);
  useEffect(() => {
    isLoggedIn().then(loggedIn => {
      setLoggedIn(loggedIn)
    })
  })
  return loggedIn == null ? <> </> : (
    <div className="main-wrapper container">
      <>

        {loggedIn ? <React.Suspense fallback={<h1>Ladataan...</h1>}>
        <Switch history={history}>
          <Route path="/" exact component={Home} />
          <Route component={Error404} />
        </Switch>
        </React.Suspense> : <React.Suspense fallback={<h1>Ladataan...</h1>}>
        <Switch history={history}>
          <Route path="/" exact component={Login} />
          <Route path="/opinsys" exact component={LoginOpinsys} />
          <Route component={Error404} />
        </Switch>
        </React.Suspense>}
      </>
    </div>
  );
}

export default App;
