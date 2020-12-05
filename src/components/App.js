import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import MainPage from "../pages/MainPage";
import TitlePage from "../pages/TitlePage";
import AuthName from "../lib/AuthName"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => AuthName() ? <MainPage /> : <Redirect to="/auth" />} />
        <Route exact path="/auth"  component={TitlePage} />
        <Route component={NotFoundPage} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
}

export default App;
  