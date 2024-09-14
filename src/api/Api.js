import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

class Api {
    constructor() {
        this.baseUrl = baseUrl;1
        console.log(this.baseUrl)
    }

    async getAllTasks() {
        try{
            const response = await axios.get(`${this.baseUrl}/tasks`);
            console.log(response)
            console.log('the api is being called')
            return response;
        } catch (error){
            console.log('Unable to get all tasks')
        }
    }

    //TODO: POST

     //TODO: edit

      //TODO: delete
}

export {
    Api, baseUrl
}
