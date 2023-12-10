import React, { useMemo } from "react";
import Card from "./Card";
import "./ByPriority.css"; // Create a corresponding CSS file for styling

const ByPriority = ({ data, order }) => {
  console.log(data, "from priority");
  console.log(order, "from priority");

  const categorizedTasks = useMemo(() => {
    const tasks = {
      nopriority: [],
      urgent: [],
      high: [],
      medium: [],
      low: [],
    };

    data?.tickets.forEach((task) => {
      switch (task.priority) {
        case 0:
          tasks.nopriority.push(task);
          break;
        case 4:
          tasks.urgent.push(task);
          break;
        case 3:
          tasks.high.push(task);
          break;
        case 2:
          tasks.medium.push(task);
          break;
        case 1:
          tasks.low.push(task);
          break;
        default:
          break;
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

    Object.keys(sortedData).forEach((userId) => {
      sortedData[userId] = sortTasks(sortedData[userId], order);
    });

    return sortedData;
  }, [categorizedTasks, order]);

  return (
    <div className="byPriorityGrid">
      {Object.keys(sortedTasks).map((priority) => (
        <div key={priority} className="priorityColumn">
          <div className="columnHeading">
            <div className="colmhead">
              <div className="mainname">{priority.toUpperCase()}</div>
              <div className="mainlen">{sortedTasks[priority].length}</div>
            </div>
            <div className="colmsym">
              <div>+</div>
              <div>...</div>
            </div>
          </div>

          {sortedTasks[priority].map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ByPriority;
