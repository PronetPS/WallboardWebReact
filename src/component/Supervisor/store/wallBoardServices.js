

// import axios from 'axios';
// const apiUrl = 'http://192.168.3.53:8090/api';


// export const wallBoardServices = {
//     getAllUser: async () => {
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");

//         const requestOptions = {
//             method: 'GET',
//             headers: headers,
//             redirect: 'follow'
//         };

//         try {
//             const response = await fetch(`${apiUrl}/users`, requestOptions);
//             const result_1 = await response.text();
//             return result_1;
//         } catch (error) {
//             return console.log('error', error);
//         }
//     },

//     deleteUser: async (id) => {
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");

//         const requestOptions = {
//             method: 'DELETE',
//             headers: headers,
//             redirect: 'follow'
//         };

//         try {
//             const response = await fetch(`${apiUrl}/User/DeleteUserDetails/${id}`, requestOptions);
//             const result_1 = await response.text();
//             return result_1;
//         } catch (error) {
//             return console.log('error', error);
//         }
//     },

//     createUser: async (data) => {
//         axios.post(apiUrl + '/adduser', data, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }).then(result => {
//             console.log(result.data);
//         });
     



//             // const headers = new Headers();
//             // headers.append("Content-Type", "application/json");
    
//             // const requestOptions = {
//             //     method: 'POST',
//             //     headers: headers,
//             //     redirect: 'follow'
//             // };

//             // try {
//             //     const response = await fetch(`${apiUrl}/User/InsertUserDetails`, {data}, requestOptions);
//             //     const result_1 = await response.text();
//             //     return result_1;
//             // } catch (error) {
//             //     return console.log('error', error);
//             // }
//     },

// }