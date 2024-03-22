const axios = require("../utils/axios");
const { bulkDelete } = require("../src/main");

describe.only("Assignment", () => {
  beforeEach(() => {
    axios.delete = jest.spyOn(axios, 'delete').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("bulkDelete()", () => {
    beforeEach(() => {
      axios.delete.mockImplementation(() => Promise.resolve({data: {} }));
    });

    it("should delete all of the records with the associated IDs", async () => {
      await bulkDelete([111, 222, 333]);
      expect(axios.delete).toHaveBeenCalledTimes(3);

      const [url] = axios.delete.mock.calls[0];
      expect(url).toContain("111");
    });

    it("should have each promise resolve to an object with the id", async () => {
      const actual = await bulkDelete([111, 222, 333, 444, 555]);
      const expected = [
        { id: 111 },
        { id: 222 },
        { id: 333 },
        { id: 444 },
        { id: 555 },
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe("Implementation", () => {
    it("should make use of Promise.all()", async () => {
      expect(bulkDelete.toString()).toContain("Promise.all(");
    });
  });
});
