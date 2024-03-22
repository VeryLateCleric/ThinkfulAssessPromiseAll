const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5001";

function bulkDelete(ids) {
    
    const deleteRequests = ids.map(id => {
        const url = `${BASE_URL}${id}`;
        return fetch(url, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete constellation with ID ${id}`);
                }
                return { id };
            })
            .catch(error => {
                console.error(error);
                return { id };
            });
    });
    return Promise.all(deleteRequests);
}

module.exports = {
  bulkDelete,
};
