import React, { useContext, useState } from "react";
import { ApiContext } from "..";

const CreateTodoItem = ({ refresh }: { refresh: () => void }) => {
  const [value, setValue] = useState<string>("");
  const api = useContext(ApiContext);
  return (
    <div className="TodoItem">
      <div>
        &gt;
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={(e) => {
            api.tache.tacheCreate({ label: value }).then(() => {
              refresh();
              setValue("");
            });
          }}
        >
          Create
        </button>
        <input type="checkbox" readOnly />
      </div>
    </div>
  );
};

export default CreateTodoItem;
