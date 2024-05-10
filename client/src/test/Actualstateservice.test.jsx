import axios from 'axios';
import { getActualState, getOneActualState } from '../../services/actualStateServices';
import { jest } from '@jest/globals';
import { describe, test, expect } from 'jest';

jest.mock('axios');

describe('Actual State Services', () => {
  test('getActualState returns data from axios', async () => {
    const mockData = { data: 'test' };
    axios.get.mockResolvedValue(mockData);

    const data = await getActualState();

    expect(data).toBe(mockData);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/actualstates');
  });

  test('getOneActualState returns data from axios', async () => {
    const mockData = { data: 'test' };
    axios.get.mockResolvedValue(mockData);

    const data = await getOneActualState(1);

    expect(data).toBe(mockData);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/actualstates/EA001');
  });

  test('getActualState throws an error', async () => {
    axios.get.mockRejectedValue(new Error('Test error'));

    await expect(getActualState()).rejects.toThrow('Test error');
  });
});
