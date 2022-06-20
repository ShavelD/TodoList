import React, {ChangeEvent} from 'react';
import {TaskType} from "../Todolist"
import EditableSpan from "./EditableSpan";


type PropsType = {
    tasksForTodolist: TaskType[]
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    editTaskHandler:  (taskID: string, newTitle: string) => void
}


export const MapComponent = ({tasksForTodolist, todolistID, removeTask, ...props}: PropsType) => {
    return (
        <div>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const onClickHandler = () => removeTask(todolistID, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}
                            />
                            <EditableSpan title={t.title}
                                          callBack={(newTitle) =>props.editTaskHandler(t.id, newTitle)}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
        </div>
    );
};
