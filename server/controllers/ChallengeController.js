import ActualStateModel from "../models/ActualStateModel.js";
import ChallengeModel from "../models/ChallengeModel.js";

export const getChallenge = async (request, response) =>{
    try {
        const challenge = await ChallengeModel.findAll();
        response.status(200).json(challenge);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addChallenge = async (req, res) => {
    try {
        let count = 1;
        const idChallenge = await ChallengeModel.findOne({}, { sort: { 'created' : -1 } });
        if (idChallenge) {
            const numberId = parseInt(idChallenge.id.slice(1));
            count = numberId + 1;
        }
        const formatted_Id = 'R' + count.toString().padStart(3, '0');     
        const actState = await ActualStateModel.findOne();   
        const actualstateId = actState.id;

        const addChallenge = await ChallengeModel.create({ id: formatted_Id, ...req.body, actual_state_id: actualstateId });
        res.status(201).json(addChallenge);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' + error});
    }
}

export const updateChallenge = async (req, res) => {   
    const challengeId = req.params.id; 
    try {
        await ChallengeModel.update(req.body,{  where: {id: challengeId}});
        await ChallengeModel.findOne({where: {id: challengeId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneChallenge = async (req, res) =>{
    const challengeId = req.params.id;
    try {
        const challenge = await ChallengeModel.findOne({ where: {id: challengeId }});
        res.status(200).json(challenge);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteChallenge = async (req, res) => {
    const challengeId = req.params.id;
    try {
        await ChallengeModel.destroy({ where: {id: challengeId } });
        return res.status(201).send({ message: 'Challenge deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};