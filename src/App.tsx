import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    const editTodolist = (todolistID: string, newTitle: string) => {
      setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle}: el))
    }

    const editTask = (todolistID:string, taskID: string,newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)});
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
    }

    const addTodolist = (newTitle: string) => {
        const newID = v1()
        let newTodolist: TodolistsType = {id: newID, title: newTitle, filter: 'all'};
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newID]: []})

    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {
                todolists.map((el) => {
                    return (
                        <Todolist
                            key={el.id}
                            todolistID={el.id}
                            title={el.title}
                            tasks={tasks[el.id]}
                            removeTask={removeTask}
                            //changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={el.filter}
                            setTodolists={setTodolists}
                            todolists={todolists}
                            removeTodolist={removeTodolist}
                            editTodolist={editTodolist}
                            editTask={editTask}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
