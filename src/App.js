import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Pages/Auth/Login";

const Error404 = React.lazy(() => import('./pages/Pages/Errors/404'));

const history = React.lazy(() => import('./history'));

function App() {  
  return (
    <div className="main-wrapper container">
      <>
        <React.Suspense fallback={<h1>Ladataan</h1>}>
        <Switch history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/account/login" exact component={Login} />
          <Route component={Error404} />
        </Switch>
        </React.Suspense>
      </>
    </div>
  );
}

export default App;
