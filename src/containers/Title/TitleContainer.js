import React, { useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import Title from "components/Title/index"
import { useHistory, withRouter } from "react-router-dom";

const MainContainer = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");

  const nextPage = useCallback(() => {
    if (title == "") {
      return;
    }

    localStorage.setItem("name", title);
    history.push("/")
  }, [title]);

  return (
    <>
      <Title title={title} setTitle={setTitle} nextPage={nextPage} />
    </>
  );
};

export default withRouter(observer(MainContainer));
