import axios from "axios";
import { getChallenge, getOneChallenge, deleteChallenge, postChallenge, updateChallenge } from "../services/challengeServices";
import jest from "jest-mock";
import { API_URL_CHALLENGE } from "../services/challengeServices";
import { expect, describe, it } from "jest";


jest.mock("axios");

describe("Challenge services", () => {
  describe("getChallenge", () => {
    it("should return a list of challenges", async () => {
      const data = [
        {
          id: 1,
          name: "Challenge 1",
          description: "This is a challenge",
          startDate: "2023-05-10",
          endDate: "2023-05-15",
          state: "En progreso",
        },
        {
          id: 2,
          name: "Challenge 2",
          description: "This is another challenge",
          startDate: "2023-05-15",
          endDate: "2023-05-20",
          state: "Completado",
        },
      ];

      axios.get.mockResolvedValueOnce({ data });

      const challenges = await getChallenge();

      expect(challenges).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error getting challenges");

      axios.get.mockRejectedValueOnce(error);

      try {
        await getChallenge();
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("getOneChallenge", () => {
    it("should return a single challenge", async () => {
      const data = {
        id: 1,
        name: "Challenge 1",
        description: "This is a challenge",
        startDate: "2023-05-10",
        endDate: "2023-05-15",
        state: "En progreso",
      };

      axios.get.mockResolvedValueOnce({ data });

      const challenge = await getOneChallenge(1);

      expect(challenge).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error getting challenge");

      axios.get.mockRejectedValueOnce(error);

      try {
        await getOneChallenge(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("deleteChallenge", () => {
    it("should delete a challenge", async () => {
      const response = {
        status: 200,
      };

      axios.delete.mockResolvedValueOnce(response);

      await deleteChallenge(1);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL_CHALLENGE}/1`);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error deleting challenge");

      axios.delete.mockRejectedValueOnce(error);

      try {
        await deleteChallenge(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("postChallenge", () => {
    it("should create a challenge", async () => {
      const data = {
        name: "Challenge 1",
        description: "This is a challenge",
        startDate: "2023-05-10",
        endDate: "2023-05-15",
        state: "En progreso",
      };

      const response = {
        data: data,
      };

      axios.post.mockResolvedValueOnce(response);

      const challenge = await postChallenge(data);

      expect(challenge).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error creating challenge");

      axios.post.mockRejectedValueOnce(error);

      try {
        await postChallenge({});
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("updateChallenge", () => {
    it("should update a challenge", async () => {
      const data = {
        id: 1,
        name: "Challenge 1",
        description: "This is a challenge",
        startDate: "2023-05-10",
        endDate: "2023-05-15",
        state: "En progreso",
      };

      const response = {
        data: data,
      };

      axios.put.mockResolvedValueOnce(response);

      const challenge = await updateChallenge(1, data);

      expect(challenge).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error updating challenge");

      axios.put.mockRejectedValueOnce(error);

      try {
        await updateChallenge(1, {});
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
