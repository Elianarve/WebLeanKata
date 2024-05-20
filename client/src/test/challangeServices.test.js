import axios from 'axios';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import { getChallenge } from '../../src/services/challengeServices';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getChallenge } from '../services/challengeServices'; // Ajusta la ruta de importación según la estructura de tu proyecto

describe('getChallenge', () => {
  beforeEach(() => {
    // Configurar el token de autenticación en localStorage antes de cada prueba
    localStorage.setItem('authToken', 'test-token');
    vi.resetAllMocks();
  });

  it('debería retornar un array de desafíos', async () => {
    const mockData = [{ id: 1, name: 'Desafío 1' }, { id: 2, name: 'Desafío 2' }];
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    const challenges = await getChallenge();
    expect(challenges).toBeInstanceOf(Array);
    expect(challenges.length).toBeGreaterThan(0);
  });

  it('debería lanzar un error si la solicitud falla', async () => {
    const mockError = new Error('Network error');
    vi.spyOn(axios, 'get').mockRejectedValue(mockError);

    await expect(getChallenge()).rejects.toThrow('Network error');
  });
});
import axios from 'axios';
import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import Sinon from 'sinon';
import { getChallenge, getOneChallenge, deleteChallenge, postChallenge, updateChallenge } from '../services/challengeServices';

import sinon from 'sinon';
import * as challengeServices from '../../src/services/challengeServices';

describe('challengeServices', () => {
    let localStorageStub;

    beforeEach(() => {
        localStorageStub = sinon.stub(localStorage, 'getItem');
        localStorageStub.withArgs('authToken').returns('mockToken');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('updateChallenge', () => {
        it('should update an existing challenge successfully', async () => {
            localStorage.setItem('authToken', 'mockToken');
        });

        it('should throw an error when the request fails', async () => {
            // Configura el token en el almacenamiento local
            localStorage.setItem('authToken', 'mockToken');

            // Simula una solicitud de actualización fallida
            sinon.stub(axios, 'put').rejects(new Error('Network error'));

            await expect(challengeServices.updateChallenge('challengeId', { /* datos actualizados del desafío */ })).rejects.toThrow('Network error');
        });
    });

   
});
export const deleteChallenge = async (id) => {
    try {
        const headers = getHeaders();
        const response = await axios.delete(`${API_URL_CHALLENGE}/${id}`, { headers });
        const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el estado objetivo?");
        if (confirmDelete && response && response.status === 200) {
            alert('Eliminado correctamente');
        }
    } catch (error) {
        console.error("Error al eliminar el reto:", error);
        throw error;
    }
};
