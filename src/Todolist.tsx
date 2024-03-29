import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TodolistsType} from './App';
import AddItemForm from "./components/AddItemForm";
import {MapComponent} from "./components/MapComponent";
import EditableSpan from "./components/EditableSpan";
import {Button} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    todolistID: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    //changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    setTodolists: (todolists: Array<TodolistsType>) => void
    todolists: Array<TodolistsType>
    removeTodolist: (todolistID: string) => void
    editTodolist: (todolistID: string, newTitle: string) => void
    editTask: (todolistID: string, taskID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    function changeFilter(todolistID: string, value: FilterValuesType) {
        props.setTodolists(props.todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    const onAllClickHandler = () => changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => changeFilter(props.todolistID, "completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.todolistID, newTitle)
    }
    const editTaskHandler = (taskID: string, newTitle: string) => {
        props.editTask(props.todolistID, taskID, newTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editTodolistHandler}/>
            <Button
                variant="outlined" color="error"
                style={{maxWidth: '15px', maxHeight: '21px', minWidth: '15px', minHeight: '21px', marginLeft: '8px'}}
                onClick={removeTodolistHandler}>x</Button>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <MapComponent
            tasksForTodolist={tasksForTodolist}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            todolistID={props.todolistID}
            editTaskHandler={editTaskHandler}
        />
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="secondary"
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
