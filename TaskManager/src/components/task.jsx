import React, { useEffect } from "react";
import { addTask, getTasks } from "../store/tasks";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegan } from "../store/api";
import axios from '../utils/http'

const Tasks = () => {

    const dispatch = useDispatch()
    const taskSli = useSelector(state => state.tasks)


    // const gettingTasks = async () => {
    //     try {
    //         const response = await axios.get("/tasks");
    //         dispatch(getTasks(response.data))
    //         console.log(response)
    //     } catch (error) {
    //         dispatch({ type: "SHOW_ERROR", payload: { error: error.message } })
    //     }

    // }

    useEffect(() => {
        // gettingTasks()

        // dispatch({
        //     type: 'apiRequest',
        //     payload: {
        //         url: '/tasks',
        //         onStart: 'tasks/apiRequested',
        //         onSuccess: 'tasks/getTasks', //type of action for getTasks is tasks/getTasks
        //         onError: "tasks/apiRequestefailed"
        //     }
        // })

        dispatch(apiCallBegan({
            url: '/tasks',
            onStart: 'tasks/apiRequested',
            onSuccess: 'tasks/getTasks', //type of action for getTasks is tasks/getTasks
            onError: "tasks/apiRequestefailed"
        }))

    }, [])

    return <div>{taskSli.tasks.map(a => (<div key={a.id}>{a.task}
        <button onClick={() => dispatch(apiCallBegan({
            url: `/tasks/${a.id}`,
            method: 'DELETE',
            onSuccess: 'tasks/removeTask'
        }))}>Delete</button></div>))}


        <button onClick={() => dispatch(apiCallBegan({
            url: '/tasks',
            method: 'POST',
            data: { task: "Complete This excercise" },
            onSuccess: 'tasks/addTask'
        }))}>haha</button>

        <button onClick={() => dispatch(apiCallBegan({
            url: `/tasks/${'2'}`,
            method: 'PATCH',
            data: { completed: true },
            onSuccess: 'tasks/completedTask'
        }))}>Complete task 2</button>


    </div>
}

export default Tasks;