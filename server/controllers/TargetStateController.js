import ChallengeModel from "../models/ChallengeModel.js";
import TargetStateModel from "../models/TargetStateModel.js";

export const getTargetState = async (request, response) =>{
    try {
        const targetState = await TargetStateModel.findAll();
        response.status(200).json(targetState);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addTargetState = async (req, res) => {
    try {
        
        let count = 1;
        const idTargetState = await TargetStateModel.findOne({order: [['id', 'DESC']]});
       
        if (idTargetState) {
            const numberId = parseInt(idTargetState.id.slice(2));
            count = numberId + 1;
        } 
        const formatted_Id = 'EO' + count.toString().padStart(3, '0');
       
        const challengeId = await ChallengeModel.findOne({order: [['id', 'DESC']]}); 
        const targetStateId = challengeId.id;
      
        const addTargetStat = await TargetStateModel.create({  id: formatted_Id, ...req.body, challenge_id: targetStateId });
        res.status(201).json(addTargetStat);
    }catch(error){
        console.log(error)
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateTargetState = async (req, res) => {   
    const targetStateId = req.params.id; 
    try {
        await TargetStateModel.update(req.body,{  where: {id: targetStateId}});
        await TargetStateModel.findOne({where: {id: targetStateId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneTargetState = async (req, res) =>{
    const targetStateId = req.params.id;
    try {
        const targetState = await TargetStateModel.findOne({ where: {id: targetStateId }});
        res.status(200).json(targetState);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteTargetState = async (req, res) => {
    const targetStateId = req.params.id;
    try {
        await TargetStateModel.destroy({ where: {id: targetStateId} });
        return res.status(201).send({ message: 'Target State deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};