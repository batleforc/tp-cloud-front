import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import { ApiContext } from ".";
import { ModelTask } from "./helper/api";

function App() {
  const [taches, setTaches] = useState<ModelTask[]>();
  const api = useContext(ApiContext);
  useEffect(() => {
    api.tache
      .tacheList()
      .then((req) => req.data)
      .then((val) => {
        setTaches(val);
        console.log(val);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      {taches?.map((val) => (
        <p key={val.id}>{val.label}</p>
      ))}
    </div>
  );
}

export default App;
