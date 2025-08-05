import axios from 'axios'
export let instanceAxios = axios.create({
    baseURL: 'http://localhost:8080'
}) // No need to pass Application: 'Context'
   // No need to convert js object to json springigy