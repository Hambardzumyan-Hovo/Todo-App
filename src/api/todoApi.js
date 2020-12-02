const { default: Axios } = require("axios");

export const getTodosApi = async () => {
  const res = await Axios.get(" https://todo.eachbase.com/api/HovhannesHambardzumyan/todos");
  return res.data;
};

export const addTodoApi = async data => {
  const res = await Axios.post(" https://todo.eachbase.com/api/HovhannesHambardzumyan/todos", data);
  return res.data;
};

export const deleteTodoApi = async id => {
  const res = await Axios.delete(`https://todo.eachbase.com/api/HovhannesHambardzumyan/todos/${id}`);
  return res.data;
};

export const editTodoApi = async (id, data) => {
  const res = await Axios.patch(`https://todo.eachbase.com/api/HovhannesHambardzumyan/todos/${id}`, data);
  return res.data;
};
