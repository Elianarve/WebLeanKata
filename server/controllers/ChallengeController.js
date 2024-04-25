import ChallengeModel from "../models/ChallengeModel.js";

const countId = async () => {
    let count = 1;
    const idChallenge = await ChallengeModel.findOne({}, { sort: { 'created' : -1 } });
    if (idChallenge) {
        const numberId = parseInt(idChallenge.id.slice(1));
        count = numberId + 1;
    }
    return count;
};


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
        const count = await countId();
        const formatted_Id = 'R' + String(count).padStart(3, '0');
        const addChallenge = await ChallengeModel.create({ ...req.body, id: formatted_Id });
        // const addChallenge = await ChallengeModel.create(req.body);
        res.status(201).json(addChallenge);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' });
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