import React from "react";
import { inject, observer } from "mobx-react";
import Title from "components/Title/index"

const MainContainer = () => {
  return (
    <>
      <Title />
    </>
  );
};

export default inject("store")(observer(MainContainer));
