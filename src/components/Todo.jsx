import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
  },
  input: {
    margin: 10,
    width: "92%",
    pointerEvents: "auto",
  },
  disableInput: {
    margin: 10,
    width: "92%",
    pointerEvents: "none",
  },
});

const Todo = ({ title, description, color, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch(); //Setting useDispatch hook to dispatch actions
  const { register, handleSubmit } = useForm(); //Hook from react-hook-form package to collect form data and submit it
  const [editMode, setEditMode] = useState(true); //State for editing todo card

  //Delete todo card
  const handleDelete = () => {
    console.log(id);
    dispatch({ type: "DELETE_TODO", id });
  };

  //Toggle edit mode
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  //Submit edited data
  const onSubmit = data => {
    if (editMode) {
      const newTodo = { ...data, id: id };
      dispatch({ type: "UPDATE_TODO", id, newTodo });
    }
  };

  return (
    <div className={"todo-item"}>
      Todo card
      <Card className={classes.root}>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <TextField
              inputRef={register}
              variant='outlined'
              size='small'
              label='Title'
              name='title'
              className={editMode ? classes.disableInput : classes.input}
              defaultValue={title}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              inputRef={register}
              variant='outlined'
              size='small'
              label='Description'
              name='description'
              multiline
              rows={2}
              className={editMode ? classes.disableInput : classes.input}
              defaultValue={description}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={"color-input"}>
              <TextField
                inputRef={register}
                variant='outlined'
                size='small'
                type='color'
                label='Color'
                name='color'
                defaultValue={color}
                className={editMode ? classes.disableInput : classes.input}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={handleEdit} type='submit'>
              {editMode ? <EditIcon /> : <SaveIcon />}
              {editMode ? "Edit" : "Save"}
            </Button>
            <Button size='small' onClick={handleDelete}>
              <DeleteIcon /> Delete
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default Todo;
