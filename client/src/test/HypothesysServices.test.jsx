import sinon from 'sinon';
import axios from 'axios';

import { getOneHypothesis, deleteHypothesis } from '../../src/services/hypothesisServices';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';

describe('getOneHypothesis', () => {
  it('should throw an error if the request fails', async () => {
    const id = 1;
    const expectedError = new Error('Token no encontrado en el almacenamiento local');

    sinon.stub(axios, 'get').rejects(expectedError);

    await expect(getOneHypothesis(id)).rejects.toThrow(expectedError);
  });
});

  it('should throw an error if the request fails', async () => {
    const id = 1;
    const mockError = new Error('Network error');

    localStorage.setItem('authToken', 'validTokenValue');

    const axiosStub = sinon.stub(axios, 'delete').rejects(mockError);

    await expect(deleteHypothesis(id)).rejects.toThrow(mockError);
    
    axiosStub.restore();
  });



import { updateHypothesis } from '../../src/services/hypothesisServices';

describe('updateHypothesis', () => {
  it('should update the hypothesis with the given ID', async () => {
    const id = 1;
    const data = { name: 'Updated Hypothesis' };



  });

});
