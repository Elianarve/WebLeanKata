import ActualStateModel from "../models/ActualStateModel.js";
import ChallengeModel from "../models/ChallengeModel.js";
import { Op } from 'sequelize';

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
    
        const idChallenge = await ChallengeModel.findOne({order: [['id', 'DESC']]});
        console.log(idChallenge)
        let count = 1;
        if (idChallenge) {
            const numberId = parseInt(idChallenge.id.slice(1));
            count = numberId + 1;
        }
        let actualstateId;
        const formatted_Id = 'R' + count.toString().padStart(3, '0');    
        console.log(formatted_Id) 
        const actState = await ActualStateModel.findOne({order: [['id', 'DESC']]});   
        actualstateId = actState.id;
        console.log(actualstateId)

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

export const searchChallenge = async (req, res) => {
    const searchText = req.query.texto; 

    try {
        const challenges = await ChallengeModel.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${searchText}%`}},
                    { description: { [Op.iLike]: `%${searchText}%`}}
                ]
            }
        });

        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error searching challenges:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}