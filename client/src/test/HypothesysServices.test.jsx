import sinon from 'sinon';
import axios from 'axios';

import { getOneHypothesis } from '../../src/services/hypothesisServices';
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



describe('updateHypothesis', () => {
  it('should update the hypothesis with the given ID', async () => {
    const id = 1;
    const data = { name: 'Updated Hypothesis' };



  });

});
