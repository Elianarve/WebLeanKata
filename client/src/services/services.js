import { postActualState, postChallenge } from "./actualStateServices";

export const createActualStateAndChallenge = async (actualStateData, challengeData) => {
    try {
      const actualStateResponse = await postActualState(actualStateData);
      const actualStateId = actualStateResponse.data.id;
  
      const challengeWithActualState = { ...challengeData, actualStateId };
      const challengeResponse = await postChallenge(challengeWithActualState);
  
      console.log("Estado actual creado:", actualStateResponse.data);
      console.log("Desafío creado:", challengeResponse.data);
  
      return { actualState: actualStateResponse.data, challenge: challengeResponse.data };
    } catch (error) {
      console.error("Error al crear el estado actual o el desafío:", error);
      throw error;
    }
  };