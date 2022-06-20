import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";




type AddItemFormPropsType = {
    callBack: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === "Enter") {
            addTask();
        }
    }
    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField id="outlined-basic" label="Title is required" variant="outlined"  size='small'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={error}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <Button
                variant="contained"
                style={{maxWidth: '25px', maxHeight: '34px', minWidth: '25px', minHeight: '34px', margin: '3px 8px'}}
                onClick={addTask}>+</Button>
            {/*{error && <div className="error-message">"Title is required"</div>}*/}
        </div>
    );
};

export default AddItemForm;