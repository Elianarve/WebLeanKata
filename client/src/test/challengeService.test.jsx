import { getChallenge, getOneChallenge, deleteChallenge, postChallenge, updateChallenge } from './challengeServices';
import { describe, it, expect} from 'jest';

describe('challengeServices', () => {
  describe('getChallenge', () => {
    it('should return challenges on success', async () => {
      const challenges = await getChallenge();

      expect(challenges).toBeInstanceOf(Array);
      expect(challenges.length).toBeGreaterThan(0);
    });

    it('should throw error on failure', async () => {
      await expect(getChallenge()).rejects.toThrowError();
    });
  });

  describe('getOneChallenge', () => {
    it('should return challenge by ID on success', async () => {
      const challenge = await getOneChallenge(1);

      expect(challenge).toBeInstanceOf(Object);
      expect(challenge.id).toBe(1);
    });

    it('should throw error on failure', async () => {
      await expect(getOneChallenge(1)).rejects.toThrowError();
    });
  });

  describe('deleteChallenge', () => {
    it('should delete challenge on success', async () => {
      await deleteChallenge(1);

      // No specific assertion needed, as the API response is not tested here
    });

    it('should throw error on failure', async () => {
      await expect(deleteChallenge(1)).rejects.toThrowError();
    });
  });

  describe('postChallenge', () => {
    it('should create challenge on success', async () => {
      const challenge = await postChallenge({ description: 'Challenge description 1' });

      expect(challenge).toBeInstanceOf(Object);
      expect(challenge.description).toBe('Challenge description 1');
    });

    it('should throw error on failure', async () => {
      await expect(postChallenge({ description: 'Challenge description 1' })).rejects.toThrowError();
    });
  });

  describe('updateChallenge', () => {
    it('should update challenge on success', async () => {
      const challenge = await updateChallenge(1, { description: 'Challenge description 1' });

      expect(challenge).toBeInstanceOf(Object);
      expect(challenge.description).toBe('Challenge description 1');
    });

    it('should throw error on failure', async () => {
      await expect(updateChallenge(1, { description: 'Challenge description 1' })).rejects.toThrowError();
    });
  });
});
