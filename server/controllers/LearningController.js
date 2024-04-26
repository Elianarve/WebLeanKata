import LearningsModel from '..//models/LearningsModel.js';
import ResultsModel from '../models/ResultsModel.js';

export const getLearning = async (request, response) =>{
    try {
        const learning = await LearningsModel.findAll();
        response.status(200).json(learning);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addLearnings = async (req, res) => {
    try {
        let count = 1;
        const idLearning = await LearningsModel.findOne({}, { sort: { 'created' : -1 } });
        if (idLearning) {
            const numberId = parseInt(idLearning.id.slice(2));
            count = numberId + 1;
        }
        const formatted_Id = 'AP' + count.toString().padStart(3, '0');     
        const result = await ResultsModel.findOne();   
        const resutId = result.id;

        const addResults = await LearningsModel.create({  id: formatted_Id, results_id: resutId, ...req.body });
        res.status(201).json(addResults);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateLearnings = async (req, res) => {   
    const learningId = req.params.id; 
    try {
        await LearningsModel.update(req.body,{  where: {id: learningId }});
        await LearningsModel.findOne({where: {id: learningId }});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneLearning = async (req, res) =>{
    const learningId = req.params.id;
    try {
        const learning = await LearningsModel.findOne({ where: {id: learningId  }});
        res.status(200).json(learning);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteLearning = async (req, res) => {
    const learningId = req.params.id;
    try {
        await LearningsModel.destroy({ where: {id: learningId } });
        return res.status(201).send({ message: 'Learning deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};