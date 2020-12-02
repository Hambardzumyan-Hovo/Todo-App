import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useForm } from "react-hook-form";
import { addTodoApi } from "../api/todoApi";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
  },

  input: {
    margin: 10,
    width: "92%",
  },
});

const AddTodo = ({ card, showAddTodo }) => {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm(); //Hook from react-hook-form to collect data and submit it
  const dispatch = useDispatch(); //Setting useDispatch hook to dispatch actions

  //Adding new todo card
  const onSubmit = data => {
    addTodoApi(data).then(res => {
      const newTodo = res;
      dispatch({ type: "ADD_TODO", newTodo });
      reset();
    });
    showAddTodo(false);
  };

  return (
    <div className={!card ? "default" : "default add-todo-card"}>
      Add Todo
      <Card className={classes.root}>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <TextField
              required
              inputRef={register}
              variant='outlined'
              size='small'
              label='Title'
              name='title'
              className={classes.input}
            />
            <TextField
              required
              inputRef={register}
              variant='outlined'
              size='small'
              label='Description'
              name='description'
              className={classes.input}
              multiline
              rows={2}
            />
            <div className={"color-input"}>
              <TextField
                required
                inputRef={register}
                variant='outlined'
                size='small'
                type='color'
                label='Color'
                name='color'
                className={classes.input}
                defaultValue='#000000'
              />
            </div>
          </CardContent>
          <CardActions>
            <Button size='small' type='submit'>
              <SaveIcon /> Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default AddTodo;
