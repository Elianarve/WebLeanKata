import axios from "axios";
import { getTask, getOneTask, deleteTask, postTask, updateTask } from "../services/taskServices";
import jest from "jest";
import {describe, expect, it} from "jest";
import {API_URL} from "../services/taskServices";


jest.mock("axios") // This is a mock function that allows us to mock the axios module
 describe ("Task services", () => {
  describe("getTask", () => {
    it("should return a list of tasks", async () => {
      const data = [
        {
          id: 1,
          name: "Task 1",
          description: "This is a task",
          startDate: "2023-05-10",
          endDate: "2023-05-15",
          state: "En progreso",
        },
        {
          id: 2,
          name: "Task 2",
          description: "This is another task",
          startDate: "2023-05-15",
          endDate: "2023-05-20",
          state: "Completado",
        },
      ];

      axios.get.mockResolvedValueOnce({ data });

      const tasks = await getTask();

      expect(tasks).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error getting tasks");

      axios.get.mockRejectedValueOnce(error);

      try {
        await getTask();
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("getOneTask", () => {
    it("should return a single task", async () => {
      const data = {
        id: 1,
        name: "Task 1",
        description: "This is a task",
        startDate: "2023-05-10",
        endDate: "2023-05-15",
        state: "En progreso",
      };

      axios.get.mockResolvedValueOnce({ data });

      const task = await getOneTask(1);

      expect(task).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error getting task");

      axios.get.mockRejectedValueOnce(error);

      try {
        await getOneTask(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      const response = {
        status: 200,
      };

      axios.delete.mockResolvedValueOnce(response);

      await deleteTask(1);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/1`);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error deleting task");

      axios.delete.mockRejectedValueOnce(error);

      try {
        await deleteTask(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("postTask", () => {
    it("should create a task", async () => {
      const data = {
        name: "Task 1",
        description: "This is a task",
        startDate: "2023-05-10",
        endDate: "2023-05-15",
        state: "En progreso",
      };

      const response = {
        data: data,
      };

      axios.post.mockResolvedValueOnce(response);

      const task = await postTask(data);

      expect(task).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error creating task");

      axios.post.mockRejectedValueOnce(error);

      try {
        await postTask({ });
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("updateTask", () => {
    it("should update a task", async () => {
      const data = {
        id: 1,
        name: "Task 1",
        description: "This is a task",
        startDate: "2023-05-10",
        endDate: "2023-05-15",
        state: "En progreso",
      };

      const response = {
        data: data,
      };

      axios.put.mockResolvedValueOnce(response);

      const task = await updateTask(1, data);

      expect(task).toEqual(data);
    });

    it("should throw an error if the request fails", async () => {
      const error = new Error("Error updating task");

      axios.put.mockRejectedValueOnce(error);

      try {
        await updateTask(1, { });
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
