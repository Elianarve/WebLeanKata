import ExperimentModel from '../models/ExperimentModel.js';
import HypothesisModel from '../models/HypothesisModel.js';


export const getExperiment = async (request, response) =>{
    try {
        const experiment = await ExperimentModel.findAll();
        response.status(200).json(experiment);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addExperiment = async (req, res) => {
    try {
        
        let count = 1;
        const idExperiment= await ExperimentModel.findOne({order: [['id', 'DESC']]});
       
        if (idExperiment) {
            const numberId = parseInt(idExperiment.id.slice(2));
            count = numberId + 1;
        } 
        const formatted_Id = 'Ex' + count.toString().padStart(3, '0');
      
        const addExperiment = await ExperimentModel.create({  id: formatted_Id, ...req.body });
        res.status(201).json(addExperiment);
    }catch(error){
        console.log(error)
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateExperiment = async (req, res) => {   
    const experimentId = req.params.id; 
    try {
        await ExperimentModel.update(req.body,{  where: {id: experimentId}});
        await ExperimentModel.findOne({where: {id: experimentId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneExperiment = async (req, res) =>{
    const  experimentId = req.params.id;
    try {
        const experiment = await ExperimentModel.findOne({ where: {id: experimentId }});
        res.status(200).json(experiment);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteExperiment = async (req, res) => {
    const  experimentId = req.params.id;
    try {
        await ExperimentModel.destroy({ where: {id: experimentId } });
        return res.status(201).send({ message: 'Experiment deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};