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
        const formatted_Id = 'R' + String(count).padStart(3, '0');

        const addChallenge = await ChallengeModel.create({ ...req.body, id: formatted_Id });
        // const addChallenge = await ChallengeModel.create(req.body);
        res.status(201).json(addChallenge);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}