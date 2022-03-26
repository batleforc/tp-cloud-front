import React from "react";
import { ModelTask } from "../helper/api";

const TodoItem = ({ item: { id, label, status } }: { item: ModelTask }) => {
  return (
    <div className="TodoItem">
      <p>
        &gt; {label}
        <input type="checkbox" checked={status} />
      </p>
    </div>
  );
};

export default TodoItem;
