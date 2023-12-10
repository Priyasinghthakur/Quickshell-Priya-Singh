import { useEffect, useState } from "react";
import "./App.css";
import { FiChevronDown } from "react-icons/fi";
import { IoOptionsSharp } from "react-icons/io5";
import ByStatus from "./component/ByStatus";

import ByPriority from "./component/ByPriority";
import ByUsers from "./component/ByUsers";

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("Grouping");
  const [selectedOrdering, setSelectedOrdering] = useState("Ordering");
  const [subMenu, setSubMenu] = useState(null);

  const groupingOptions = ["Status", "User", "Priority"];
  const orderingOptions = ["Priority", "Title"];

  const url = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  };
  useEffect(() => {
    fetchInfo();
    console.log(data);
  }, []);

  const handleMainClick = () => {
    setIsActive(!isActive);
  };

  const handleSubMenuClick = (option, isGrouping) => {
    if (isGrouping) {
      setSelectedGrouping(option);
    } else {
      setSelectedOrdering(option);
    }
  };

  const renderGroupingComponent = () => {
    switch (selectedGrouping) {
      case "User":
        return <ByUsers data={data} order={selectedOrdering} />;
      case "Status":
        return <ByStatus data={data} order={selectedOrdering} />;
      case "Priority":
        return <ByPriority data={data} order={selectedOrdering} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <button className="header-button" onClick={handleMainClick}>
            <IoOptionsSharp className="iconop" />
            <span>Display</span>
            <FiChevronDown className="icondw" />
          </button>
          {isActive && (
            <div className="dropdown-container">
              <div className="dropdown">
                <div
                  onClick={() => {
                    setSubMenu(null);
                  }}
                  className="dropdown-btn"
                >
                  {selectedGrouping}
                </div>
                <div
                  className="dropdown-content"
                  style={{ display: isActive ? "block" : "none" }}
                >
                  {groupingOptions.map((option) => (
                    <div
                      key={option}
                      className="item"
                      onClick={() => handleSubMenuClick(option, true)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <div className="dropdown">
                <div
                  onClick={() => {
                    setSubMenu(null);
                  }}
                  className="dropdown-btn"
                >
                  {selectedOrdering}
                </div>
                <div
                  className="dropdown-content"
                  style={{ display: isActive ? "block" : "none" }}
                >
                  {orderingOptions.map((option) => (
                    <div
                      key={option}
                      className="item"
                      onClick={() => handleSubMenuClick(option, false)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {renderGroupingComponent()}
      <footer className="App-footer">Made By ❤️Priya Singh❤️</footer>
    </div>
  );
}
