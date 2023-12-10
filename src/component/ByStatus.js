import React, { useMemo } from "react";
import Card from "./Card";
import "./ByStatus.css";

const ByStatus = ({ data, order }) => {
  console.log(data, "from status");
  console.log(order, "from status");

  const categorizedTasks = useMemo(() => {
    const tasks = {
      backlog: [],
      todo: [],
      inprogress: [],
      done: [],
      canceled: [],
    };

    data?.tickets.forEach((task) => {
      if (task.status === "In progress") {
        tasks.inprogress.push(task);
      } else if (task.status === "Canceled") {
        tasks.canceled.push(task);
      } else if (task.status === "Todo") {
        tasks.todo.push(task);
      } else if (task.status === "Backlog") {
        tasks.backlog.push(task);
      } else if (task.status === "Done") {
        tasks.done.push(task);
      }
    });

    return tasks;
  }, [data?.tickets]);

  const sortTasks = (tasks, sortBy) => {
    if (sortBy === "Priority") {
      return tasks.sort((a, b) => a.priority - b.priority);
    } else if (sortBy === "Title") {
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    }

    return tasks;
  };

  const sortedTasks = useMemo(() => {
    const sortedData = { ...categorizedTasks };

    Object.keys(sortedData).forEach((status) => {
      sortedData[status] = sortTasks(sortedData[status], order);
    });

    return sortedData;
  }, [categorizedTasks, order]);

  return (
    <div className="byStatusGrid">
      {Object.keys(sortedTasks).map((status) => (
        <div key={status} className="statusColumn">
          <div className="columnHeading">
            <div className="colmhead">
              <div className="mainname">{status.toUpperCase()}</div>
              <div className="mainlen">{sortedTasks[status].length}</div>
            </div>
            <div className="colmsym">
              <div>+</div>
              <div>...</div>
            </div>
          </div>

          {sortedTasks[status].map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ByStatus;
