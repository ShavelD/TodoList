import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
            props.callBack(newTitle);
    }

    const [edit, setEdit] = useState(false)
    const EditTrueHandler = () => {
        setEdit(!edit)
        addTask()
    }
    return (
        edit
            ?
            <TextField id="outlined-basic"
                       variant="outlined"
                       onBlur={EditTrueHandler}
                       onChange={onChangeHandler}
                       autoFocus
                       type="text"
                       value={newTitle}
                       size='small'
            />
            // <input
            //     onBlur={EditTrueHandler} onChange={onChangeHandler} autoFocus type="text" value={newTitle}/>
            : <span onDoubleClick={EditTrueHandler}>{props.title}</span>
    );
};

export default EditableSpan;