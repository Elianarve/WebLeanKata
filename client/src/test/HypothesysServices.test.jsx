import sinon from 'sinon';
import axios from 'axios';
import { describe, it, expect } from 'vitest';
import { getOneHypothesis } from '../../src/services/hypothesisServices';

describe('getOneHypothesis', () => {
  it('should throw an error if the request fails', async () => {
    const id = 1;
    const expectedError = new Error('Token no encontrado en el almacenamiento local');

    // Stubear la función axios.get para que devuelva un error relacionado con el token no encontrado
    sinon.stub(axios, 'get').rejects(expectedError);

    // Verificar que llamar a la función genere el error esperado
    await expect(getOneHypothesis(id)).rejects.toThrow(expectedError);
  });
});
