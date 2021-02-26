import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Process from "./pages/Process/Process";
import Library from "./pages/Library/Library";

const Router = ()=>{

  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/library" component={Library} />
          <Route path="/" component={Process} />
        </Switch>
      </BrowserRouter>
  );
}

export default Router;