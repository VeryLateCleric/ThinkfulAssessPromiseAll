const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5001/constellations";


const ids = ["KGQIwSq", "32TN5F8", "KMS1234"];

// function bulkDelete(ids) {
//     const deleteRequests = ids.map(id => {
//         const url = `${BASE_URL}${id}`;
//         return fetch(url, { method: 'DELETE' })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Failed to delete constellation with ID ${id}`);
//                 }
//                 return { id: String(id) };
//             })
//             .catch(error => {
//                 console.error(error);
//                 return { id };
//             });
//     });
//     return Promise.all(deleteRequests);
// }

async function bulkDelete(ids) {
    try {
        const deleteRequests = ids.map(id => {
            const url = `${BASE_URL}${id}`;
            console.log(`Request is made to ${url}`)
            return axios.delete(url).then(() => ({id}));
        })

        const results = await Promise.all(deleteRequests)
        
        const deletedItems = results.map(result => ({ id: result.id }));
        console.log('Return value:', deletedItems);
        return deletedItems
    } catch (error) {
        console.error('Error')
    }
}

bulkDelete(ids).then(console.log);

module.exports = {
  bulkDelete,
};
