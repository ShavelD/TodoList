import React, {ChangeEvent} from 'react';
import {TaskType} from "../Todolist"
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type PropsType = {
    tasksForTodolist: TaskType[]
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    editTaskHandler: (taskID: string, newTitle: string) => void
}


export const MapComponent = ({tasksForTodolist, todolistID, removeTask, ...props}: PropsType) => {
    return (
        <div>
            <div>
                {
                    tasksForTodolist.map(t => {
                        const onClickHandler = () => removeTask(todolistID, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                        }

                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox defaultChecked
                                      onChange={onChangeHandler}
                                      checked={t.isDone}
                            />
                            {/*<input type="checkbox"*/}
                            {/*       onChange={onChangeHandler}*/}
                            {/*       checked={t.isDone}*/}
                            {/*/>*/}
                            <EditableSpan title={t.title}
                                          callBack={(newTitle) => props.editTaskHandler(t.id, newTitle)}/>
                            <IconButton aria-label="delete">
                                <Delete
                                    style={{maxWidth: '18px', maxHeight: '23px', minWidth: '18px', minHeight: '23px'}}
                                    onClick={onClickHandler}/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
        </div>
    );
};
