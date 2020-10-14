import React from "react";
import { inject, observer } from "mobx-react";
import Header from "components/Header/index"
import Draw from "components/Draw/index"

const MainContainer = () => {
  return (
    <>
      <Header />
      <Draw />
    </>
  );
};

export default inject("store")(observer(MainContainer));
