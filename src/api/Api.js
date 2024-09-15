import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

class Api {
    constructor() {
        this.baseUrl = baseUrl;1
    }

    async getAllTasks() {
        try{
            const response = await axios.get(`${this.baseUrl}/tasks`);
            return response;
        } catch (error){
            console.log('Unable to get all tasks')
        }
    }

    //TODO: POST
    async addATask (task) {
        try{
            const response = await axios.post(`${this.baseUrl}/tasks`, task, { headers: { 'Content-Type': 'application/json' }});
            return response.data
        } catch (error) {
            console.log('Unable to add task', error)
        }
    }

     //TODO: edit

      //TODO: delete
    async deleteATask (taskId){
        try{
            await axios.delete(`${this.baseUrl}/tasks/${taskId}`)
        } catch (error){
            console.log(`Failed to delete task item with id: ${taskId}`)
        }
    }
}

export {
    Api, baseUrl
}
