const initialState = [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TODOS": {
      return [...state, ...action.allTodos];
    }
    case "ADD_TODO": {
      return [...state, action.newTodo];
    }
    case "DELETE_TODO": {
      return state.filter(todo => todo._id !== action.id);
    }
    case "UPDATE_TODO": {
      return state.map(todo => {
        if (todo._id === action.id) {
          return action.newTodo;
        } else {
          return todo;
        }
      });
    }
    case "DELETE_ALL": {
      return initialState;
    }
    default:
      return state;
  }
};

export default todoReducer;
