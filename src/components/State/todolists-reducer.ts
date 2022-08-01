import {FilterValuesType, TodolistsType} from "../../App";
import {v1} from "uuid";

export const todolistsReducer = (state:  TodolistsType[], action: removeTodolistsReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :{
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST' :{
            const newID = v1()
            let newTodolist: TodolistsType = {id: newID, title: action.payload.title, filter: 'all'};
            return [...state,newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE' :{

            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title }: el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter }: el)
        }
        default: return state
    }
}

type removeTodolistsReducerType = removeTodolistsACType
    | addTodolistsACType
    | changeTodolistsACType
    | changeFilterTodolistsACType

type removeTodolistsACType = ReturnType <typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
 return {
     type: 'REMOVE-TODOLIST',
     payload: {
         todolistId
     }
 }as const
}




type addTodolistsACType = ReturnType <typeof addTodolistAC>

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    }as const
}




type changeTodolistsACType = ReturnType <typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (id: string,title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,title
        }
    }as const
}



type changeFilterTodolistsACType = ReturnType <typeof changeFilterAC>

export const changeFilterAC = (id: string,filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,filter
        }
    }as const
}