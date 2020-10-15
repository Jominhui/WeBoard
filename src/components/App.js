import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import MainPage from "../pages/MainPage"; 
import TitlePage from "../pages/TitlePage"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={TitlePage} />
        <Route exact path="/Draw" component={MainPage} />
        <Route component={NotFoundPage} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
}

export default App;
