import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import { ApiContext } from ".";
import { ModelTask } from "./helper/api";
import TodoItem from "./component/TodoItem";

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
      <p>Heroku TodoList</p>
      <div className="TodoContainer">
        {taches?.map((val) => (
          <TodoItem item={val} key={val.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
