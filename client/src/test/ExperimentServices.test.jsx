import axios from 'axios';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getExperiment } from '../../src/services/experimentServices';

describe('getExperiment', () => {
  beforeEach(() => {
    localStorage.setItem('authToken', 'test-token');
    vi.resetAllMocks();
  });

  it('should return an array of experiments', async () => {
    const mockData = [{ id: 1, name: 'Experiment 1' }, { id: 2, name: 'Experiment 2' }];
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    const experiments = await getExperiment();
    expect(experiments).toBeInstanceOf(Array);
    expect(experiments.length).toBeGreaterThan(0);
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Network error');
    vi.spyOn(axios, 'get').mockRejectedValue(mockError);

    await expect(getExperiment()).rejects.toThrow(mockError);
  });
});



import { getOneExperiment } from '../../src/services/experimentServices';

describe('getOneExperiment', () => {
  it('should return the experiment with the given ID', async () => {
    const id = 1;
    const mockExperiment = { id: 1, name: 'Experiment 1' };
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockExperiment });

    const response = await getOneExperiment(id);
    expect(response.data).toEqual(mockExperiment);
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Network error');
    vi.spyOn(axios, 'get').mockRejectedValue(mockError);

    await expect(getOneExperiment(1)).rejects.toThrow(mockError);
  });
});


import { postExperiment } from '../../src/services/experimentServices';
import sinon from 'sinon';

describe('postExperiment', () => {
  let axiosPostStub;

  beforeEach(() => {
    axiosPostStub = sinon.stub(axios, 'post');
  });

  afterEach(() => {
    axiosPostStub.restore();
  });

  it('should create a new experiment', async () => {
    const data = { name: 'New Experiment' };
    const mockResponse = { status: 201 };
    axiosPostStub.resolves({ data: mockResponse });

  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Network error');
    axiosPostStub.rejects(mockError);

    await expect(postExperiment({})).rejects.toThrow(mockError);
  });
});
