import ResultsModel from '../models/ResultsModel.js';
import ExperimentModel from '../models/ExperimentModel.js';

export const getResults = async (request, response) =>{
    try {
        const result = await ResultsModel.findAll();
        console.log(result);
        response.status(200).json(result);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addResult = async (req, res) => {
    try {
        let count = 1;
        const idResult  = await ResultsModel.findOne({}, { sort: { 'created' : -1 } });
        if (idResult) {
            const numberId = parseInt(idResult.id.slice(2));
            count = numberId + 1;
        }
        const formatted_Id = 'RE' + count.toString().padStart(3, '0');

        const experiment = await ExperimentModel.findOne();   
        const resultId = experiment.id;
          
        console.log(req.body);

        const addResult = await ResultsModel.create({  id: formatted_Id, experiment_id: resultId, ...req.body, });
        res.status(201).json(addResult);
    }catch(error){
        console.log(error)
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateResult = async (req, res) => {   
    const resultId = req.params.id; 
    try {
        await ResultsModel.update(req.body,{  where: {id: resultId}});
        await ResultsModel.findOne({where: {id: resultId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneResult = async (req, res) =>{
    const resultId = req.params.id;
    try {
        const result = await ResultsModel.findOne({ where: {id: resultId }});
        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteResult = async (req, res) => {
    const resultId = req.params.id;
    try {
        await ResultsModel.destroy({ where: {id: resultId } });
        return res.status(201).send({ message: 'Result deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};