import React, { useContext, useState, useEffect } from "react";
import { ApiContext } from "..";
import { ModelTask, RoutesChangeStatusTaskBody } from "../helper/api";

const TodoItem = ({
  item: { id, label, status, DeadLine },
  refresh,
}: {
  item: ModelTask;
  refresh: () => void;
}) => {
  const [value, setValue] = useState(label);
  useEffect(() => {
    if (label !== value) setValue(label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);
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
            if (id !== undefined) {
              api.tache.tacheUpdate(id, { label: value }).then(() => {
                refresh();
              });
            }
          }}
        >
          Send
        </button>
        <button
          onClick={(e) => {
            if (id !== undefined) {
              api.tache.tacheDelete(id).then(() => {
                refresh();
              });
            }
          }}
        >
          Delete
        </button>
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => {
            if (id !== undefined)
              api.tache
                .changeStatutUpdate(id, {
                  status: !status,
                } as RoutesChangeStatusTaskBody)
                .then(() => refresh());
          }}
        />
        <p>{DeadLine}</p>
      </div>
    </div>
  );
};

export default TodoItem;
