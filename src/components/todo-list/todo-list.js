import React from 'react';
//import ReactDOM from 'react-dom';
import ToDoListItem from '../todo-list-item';
import './todo-list.css';
const ToDoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const todo = todos;
  const elements = todo.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <ToDoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
        />
      </li>
    );
  });
  return <ul className="list-group todo-list">{elements}</ul>;
};
export default ToDoList;
