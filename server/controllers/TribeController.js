import ProcessModel from '../models/ProcessModel.js';
import TribeModel from '../models/TribeModel.js';


export const getTribe = async (request, response) =>{
    try {
        const tribe = await TribeModel.findAll();
        response.status(200).json(tribe);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}


export const addTribe = async (req, res) => {
    try {
    
        const idTribe = await TribeModel.findOne({order: [['id', 'DESC']]});
        console.log(idTribe)
        let count = 1;
        if (idTribe) {
            const numberId = parseInt(idTribe.id.slice(2));
            count = numberId + 1;
        }
        let processId;
        const formatted_Id = 'TR' + count.toString().padStart(3, '0');    
        console.log(formatted_Id) 
        const process = await ProcessModel.findOne({order: [['id', 'DESC']]});   
        processId = process.id;
        
        const addTribe = await TribeModel.create({ id: formatted_Id, ...req.body, process_id: processId });
        res.status(201).json(addTribe);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' + error});
    }
}


export const updateTribe = async (req, res) => {   
    const tribeId = req.params.id; 
    try {
        await TribeModel.update(req.body,{  where: {id: tribeId}});
        await TribeModel.findOne({where: {id: tribeId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneTribe = async (req, res) =>{
    const tribeId = req.params.id;
    console.log(tribeId)
    try {
        const tribe = await TribeModel.findOne({ where: {id: tribeId }});
        res.status(200).json(tribe);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteTribe = async (req, res) => {
    const tribeId = req.params.id;
    try {
        await TribeModel.destroy({ where: {id: tribeId } });
        return res.status(201).send({ message: 'Tribe deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};
