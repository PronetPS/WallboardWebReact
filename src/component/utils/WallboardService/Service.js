import { Base_URL } from '../base';


export const WallboardServices = {

    //for all supervioser data witin 10 min
    GetAllSupervisor10Min: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/vw_AgentStateStatus_Last10Mins`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    //for all supervioser data
    GetAllSupervisor: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getAllSupervisors`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },

    //for all KARACHI supervioser data
    GetAllKHISupervisor: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getAllKHISupervisors`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    //for all LAHORE supervioser data
    GetAllLHRSupervisor: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getAllLHRSupervisors`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },



    getWaitCall: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getWaitCall`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    getMainScreenStatsV1: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getMainScreenStatsV1`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    getMainScreenStatsV2: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getMainScreenStatsV2`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    getSliderStat: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getSliderStat`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    getTableKHILHR: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getTableLHR`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    getTableKHI: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getTableKHI`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },

    getSupervisorData: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            // const response = await fetch(`${Base_URL}/getliloData`, requestOptions);
            const response = await fetch(`${Base_URL}/getAllAgentsSupervisors`, requestOptions);

            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },

    GetMTDService: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getMTDSL`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },
    GETAHTSERVICE: async (data) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Base_URL}/getAHT`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },

}



