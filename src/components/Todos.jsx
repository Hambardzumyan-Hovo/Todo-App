import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddTodo from "./AddTodo";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Todos = () => {
  const [newCard, setNewCard] = useState(false); //Setting state to toggle new todo card
  const todos = useSelector(state => state.todos); // Getting state from redux
  const dispatch = useDispatch(); //Setting useDispatch hook to dispatch actions

  //Toggle new todo card
  const showAddTodo = () => {
    setNewCard(!newCard);
  };

  //Delete all todos and clearing state
  const deleteBoard = () => {
    dispatch({ type: "DELETE_ALL" });
    localStorage.clear();
  };

  //Getting all todos from local storage
  useEffect(() => {
    let allTodos = JSON.parse(localStorage.getItem("todos"));
    allTodos && dispatch({ type: "GET_TODOS", allTodos });
  }, [dispatch]);

  // Setting local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  return (
    <div>
      <div className='btn-container'>
        <div className='btn-group'>
          <AddCircleIcon
            fontSize='large'
            className={!newCard ? "add-todo-btn" : "add-todo-btn close-btn"}
            onClick={showAddTodo}
          />
          <p>Add Todo</p>
        </div>
        <div className='btn-group'>
          <p>Delete All</p>
          <DeleteForeverIcon fontSize='large' className='btn-delete-all' onClick={deleteBoard} />
        </div>
      </div>

      <div className='todo-board'>
        <AddTodo card={newCard} showAddTodo={showAddTodo} />
        {todos.map(s => (
          <Todo key={s.id} id={s.id} title={s.title} description={s.description} color={s.color} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
