import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
    tasks: [],
    loading: false,
    error: null
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        apiRequested:(state,action) => {
            state.loading=true;
        },
        apiRequestefailed:(state,action) => {
            state.loading=false;
        },
        getTasks: (state, action) => {
            state.tasks = action.payload
            state.loading=false
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        removeTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            state.tasks.splice(index, 1)
        },
        completedTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            state.tasks[index].completed = action.payload.completed
        }
    }
})

export const { addTask, getTasks, removeTask, completedTask,apiRequested,apiRequestefailed } = taskSlice.actions
export default taskSlice.reducer;

//below object can be used inside task.jsx for dispatch api call - dispatch(loadTasks())

// const url ='/tasks'
// export const loadTasks = () =>{
//     apiCallBegan({
//         url,
//         onStart:apiRequested.type,
//         onSuccess:getTasks.type,
//         onError:apiRequestefailed.type
//     })
// }

// export const addTask = createAction("ADD_TASK")
// export const removeTask = createAction("REMOVE_TASK")
// export const completedTask = createAction("TASK_COMPLETED")


// export default createReducer([],(builder)=> {
//     builder.addCase(
//     addTask,(state, action) => {
//         state.push(
//             {
//                 id: ++id,
//                 task: action.payload.task,
//                 completed: false
//             }
//         )
//     }).addCase(
//     removeTask,(state, action) => {
//         const index = state.findIndex(task => task.id === action.payload.id)
//         state.splice(index, 1)
//     }).addCase(
//     completedTask, (state, action) =>{
//         const index = state.findIndex(task => task.id === action.payload.id)
//         state[index].completed=true
//     })
// })
