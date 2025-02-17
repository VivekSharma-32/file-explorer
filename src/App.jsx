import { useState } from "react";
import "./App.css";

import json from "../data.json";

// render list of objects
const List = ({ list, addNodeToList, deleteNodeToList }) => {
  const [isExpanded, setIsExpanded] = useState({});

  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded[node.name] ? "-" : "+"}
            </span>
          )}
          <span>{node.name}</span>
          {node.isFolder && (
            <span onClick={() => addNodeToList(node.id)}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
                alt=""
              />
            </span>
          )}
          <span onClick={() => deleteNodeToList(node.id)}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgCtB72sd2csn3h4Xoktuuub7vFQQ-dGBOw&shttps://cdn-icons-png.flaticon.com/512/3161/3161358.png"
              alt=""
            />
          </span>
          {isExpanded[node.name] && node?.children && (
            <List
              list={node.children}
              addNodeToList={addNodeToList}
              deleteNodeToList={deleteNodeToList}
            />
          )}
        </div>
      ))}
    </div>
  );
};
const App = () => {
  const [data, setData] = useState(json);

  const addNodeToList = (parentId) => {
    const name = prompt("Enter name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node?.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: "123", name: name, isFolder: true, children: [] },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteNodeToList = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };
  return (
    <div className="App">
      <h1>File/Folder Explorer</h1>
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeToList={deleteNodeToList}
      />
    </div>
  );
};

export default App;
