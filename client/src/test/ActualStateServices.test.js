import axios from 'axios';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import axios from 'axios';

export const getOneActualState = async (id) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token no encontrado en el almacenamiento local');
  }
  const response = await axios.get(`/api/actualState/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { postActualState } from '../services/actualStateServices'; 

describe('postActualState', () => {
  beforeEach(() => {
    localStorage.setItem('authToken', 'test-token');
    vi.resetAllMocks();
  });

  it('debería crear un nuevo estado actual', async () => {
    const data = { name: 'New Actual State' };
    const mockResponse = { status: 201 };
    vi.spyOn(axios, 'post').mockResolvedValue(mockResponse);

    const response = await postActualState(data);
    expect(response.status).toBe(201);
  });

  it('debería lanzar un error si la solicitud falla', async () => {
    const mockError = new Error('Network error');
    vi.spyOn(axios, 'post').mockRejectedValue(mockError);

    await expect(postActualState({})).rejects.toThrow('Network error');
  });
});


import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getActualState } from '../services/actualStateServices'; 
describe('getActualState', () => {
  beforeEach(() => {
    localStorage.setItem('authToken', 'test-token');
    vi.resetAllMocks();
  });

  it('debería retornar un array de estados actuales', async () => {
    const mockData = [{ id: 1, state: 'ejemplo' }];
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    const actualStates = await getActualState();
    expect(actualStates).toBeInstanceOf(Array);
    expect(actualStates.length).toBeGreaterThan(0);
  });

  it('debería lanzar un error si la solicitud falla', async () => {
    const mockError = new Error('Network error');
    vi.spyOn(axios, 'get').mockRejectedValue(mockError);

    await expect(getActualState()).rejects.toThrow('Network error');
  });
});
