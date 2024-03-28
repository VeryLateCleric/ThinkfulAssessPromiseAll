const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5001/constellations";


async function bulkDelete(ids) {
    try {
        const deleteRequests = ids.map(id => {
            const url = `${BASE_URL}/${id}`;
            console.log(`Request is made to ${url}`)
            return axios.delete(url).then(() => ({id}));
        })

        const results = await Promise.all(deleteRequests)
        
        const deletedItems = results.map(result => ({ id: result.id }));
        console.log('Return value:', deletedItems);
        return deletedItems
    } catch (error) {
        console.error('Error during bulk deletion', error)
    }
}

module.exports = {
  bulkDelete,
};
