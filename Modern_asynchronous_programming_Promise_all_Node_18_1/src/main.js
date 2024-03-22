const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5001/constellations";

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

const ids = ["KGQIwSq", "32TN5F8", "KMS1234"];
bulkDelete(ids).then(console.log);

module.exports = {
  bulkDelete,
};
