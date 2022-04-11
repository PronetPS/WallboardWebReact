
import axios from 'axios';
import { Base_URL } from '../base';

export const UserServices = {
    createUser: async (data) => {
        return axios.post(Base_URL + '/createUser', data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },



    getAllUser: async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getAllUser`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },

    deleteUser: async (user_id) => {
        return axios.post(Base_URL + '/deleteUser', { user_id }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },

    updateUser: async (data) => {
        return axios.post(Base_URL + '/updateUser', data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },

    loginUser: async (data) => {
        return axios.post(Base_URL + '/loginUser', data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

