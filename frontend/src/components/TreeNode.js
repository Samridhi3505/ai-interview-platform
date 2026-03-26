import React from "react";

function TreeNode({
  node,
  path,
  completed,
  setCompleted,
  collapsed,
  setCollapsed
}) {
  const isDone = completed[path];
  const isCollapsed = collapsed[path];

  return (
    <div className="tree-node">

      {/* HEADER */}
      <div
        className="node-header"
        onClick={() => {
          setCompleted({ ...completed, [path]: !isDone });

          if (node.children) {
            setCollapsed({ ...collapsed, [path]: false });
          }
        }}
      >

        <input type="checkbox" checked={!!isDone} readOnly />

        <span className={`node-title ${isDone ? "done" : ""}`}>
          {node.title}
        </span>

        {node.children && (
          <button
            className="toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed({ ...collapsed, [path]: !isCollapsed });
            }}
          >
            {isCollapsed ? "▶" : "▼"}
          </button>
        )}
      </div>

      {/* RESOURCES */}
      {!isCollapsed && node.resources && (
        <ul className="resources">
          {node.resources.map((res, i) => (
            <li key={i}>
              🔗 <a href="#" target="_blank" rel="noreferrer">{res}</a>
            </li>
          ))}
        </ul>
      )}

      {/* CHILDREN */}
      {!isCollapsed && node.children && (
        <div className="tree-children">
          {node.children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              path={`${path}-${i}`}
              completed={completed}
              setCompleted={setCompleted}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;