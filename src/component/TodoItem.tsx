import React, { useContext } from "react";
import { ApiContext } from "..";
import { ModelTask, RoutesChangeStatusTaskBody } from "../helper/api";

const TodoItem = ({
  item: { id, label, status, DeadLine },
  refresh,
}: {
  item: ModelTask;
  refresh: () => void;
}) => {
  const api = useContext(ApiContext);
  return (
    <div className="TodoItem">
      <div>
        &gt; {label}
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
