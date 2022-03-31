import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import { ApiContext } from ".";
import { ModelTask } from "./helper/api";
import TodoItem from "./component/TodoItem";
import CreateTodoItem from "./component/CreateTodoItem";

function App() {
  const [taches, setTaches] = useState<ModelTask[]>();
  const api = useContext(ApiContext);
  const renewData = () => {
    api.tache
      .tacheList()
      .then((req) => req.data)
      .then((val) => {
        setTaches(val);
        console.log(val);
      });
  };
  useEffect(() => {
    renewData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <p>Heroku TodoList</p>
      <div className="TodoContainer">
        <CreateTodoItem refresh={renewData} />
        {taches?.map((val) => (
          <TodoItem item={val} key={val.id} refresh={renewData} />
        ))}
      </div>
    </div>
  );
}

export default App;
