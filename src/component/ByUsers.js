import React, { useMemo } from "react";
import Card from "./Card";
import "./ByUsers.css";

const ByUsers = ({ data, order }) => {
  console.log(data, "from users");
  // console.log(order, "from users");

  const categorizedTasks = useMemo(() => {
    const tasks = {};
    data?.users.forEach((user) => {
      tasks[user.id] = [];
    });
    console.log(tasks, "this isuse");
    data?.tickets.forEach((task) => {
      if (task.userId) {
        tasks[task.userId].push(task);
      }
    });

    return tasks;
  }, [data?.users, data?.tickets]);

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
    <div className="byUsersGrid">
      {Object.keys(sortedTasks).map((userId) => (
        <div key={userId} className="userColumn">
          <div className="columnHeading">
            <div className="colmhead">
              <div className="mainname">
                {data?.users.find((user) => user.id === userId)?.name}
              </div>
              <div className="mainlen">{sortedTasks[userId].length}</div>
            </div>
            <div className="colmsym">
              <div>+</div>
              <div>...</div>
            </div>
          </div>

          {sortedTasks[userId].map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ByUsers;
