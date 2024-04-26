import HypothesisModel from '../models/HypothesisModel.js';
import ObstacleModel from '../models/ObstacleModel.js';


export const getHypothesis = async (request, response) =>{
    try {
        const hypothesis = await HypothesisModel.findAll();
        response.status(200).json(hypothesis);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addHypothesis = async (req, res) => {
    try {
        
        let count = 1;
        const idHypothesis = await HypothesisModel.findOne({}, { sort: { 'created' : -1 } });
       
        if (idHypothesis) {
            const numberId = parseInt(idHypothesis.id.slice(1));
            count = numberId + 1;
        } 
        const formatted_Id = 'H' + count.toString().padStart(3, '0');
        const hypothesis = await ObstacleModel.findOne(); 
        const hypothesisId = hypothesis.id;
      
        const addHypothesis = await HypothesisModel.create({  id: formatted_Id, obstacle_id: hypothesisId, ...req.body });
        res.status(201).json(addHypothesis);
    }catch(error){
        console.log(error)
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateHypothesis = async (req, res) => {   
    const hypothesisId = req.params.id; 
    try {
        await HypothesisModel.update(req.body,{  where: {id: hypothesisId}});
        await HypothesisModel.findOne({where: {id: hypothesisId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneHypothesis = async (req, res) =>{
    const  hypothesisId = req.params.id;
    try {
        const hypothesis = await HypothesisModel.findOne({ where: {id:  hypothesisId }});
        res.status(200).json(hypothesis);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteHypothesis = async (req, res) => {
    const  hypothesisId = req.params.id;
    try {
        await HypothesisModel.destroy({ where: {id:  hypothesisId } });
        return res.status(201).send({ message: 'Hypothesis deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};