import { getActualState, getOneActualState, deleteActualState, postActualState, updateActualState } from '../services/actualStateServices';
import { describe, it, expect } from 'vitest';

describe('actualStateServices', () => {
  describe('getActualState', () => {
    it('should return actual states on success', async () => {
      const actualStates = await getActualState();

      expect(actualStates).toBeInstanceOf(Array);
      expect(actualStates.length).toBeGreaterThan(0);
    });

    it('should throw error on failure', async () => {
      await expect(getActualState()).rejects.toThrowError();
    });
  });

  describe('getOneActualState', () => {
    it('should return actual state by ID on success', async () => {
      const actualState = await getOneActualState(1);

      expect(actualState).toBeInstanceOf(Object);
      expect(actualState.id).toBe(1);
    });

    it('should throw error on failure', async () => {
      await expect(getOneActualState(1)).rejects.toThrowError();
    });
  });

  describe('deleteActualState', () => {
    it('should delete actual state on success', async () => {
      await deleteActualState(1);
    });

    it('should throw error on failure', async () => {
      await expect(deleteActualState(1)).rejects.toThrowError();
    });
  });

  describe('postActualState', () => {
    it('should create actual state on success', async () => {
      const actualState = await postActualState({ description: 'Estado actual 1' });

      expect(actualState).toBeInstanceOf(Object);
      expect(actualState.description).toBe('Estado actual 1');
    });

    it('should throw error on failure', async () => {
      await expect(postActualState({ description: 'Estado actual 1' })).rejects.toThrowError();
    });
  });

  describe('updateActualState', () => {
    it('should update actual state on success', async () => {
      const actualState = await updateActualState(1, { description: 'Estado actual 1' });

      expect(actualState).toBeInstanceOf(Object);
      expect(actualState.description).toBe('Estado actual 1');
    });

    it('should throw error on failure', async () => {
      await expect(updateActualState(1, { description: 'Estado actual 1' })).rejects.toThrowError();
    });
  });
});
