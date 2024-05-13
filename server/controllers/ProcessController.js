import ProcessModel from '../models/ProcessModel.js';

export const getProcess = async (request, response) =>{
    try {
        const process = await ProcessModel.findAll();
        response.status(200).json(process);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addProcess = async (req, res) => {
    try {
        
        let count = 1;
        const idProcess = await ProcessModel.findOne({order: [['id', 'DESC']]});
       
        if (idProcess) {
            const numberId = parseInt(idProcess.id.slice(2));
            count = numberId + 1;
        } 
        const formatted_Id = 'PR' + count.toString().padStart(3, '0');
        
        const addProcess = await ProcessModel.create({  id: formatted_Id, ...req.body, });
        res.status(201).json(addProcess);
    }catch(error){
        console.log(error)
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateProcess = async (req, res) => {   
    const processId = req.params.id; 
    try {
        await ProcessModel.update(req.body,{  where: {id: processId}});
        await ProcessModel.findOne({where: {id: processId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneProcess = async (req, res) =>{
    const processId = req.params.id;
    try {
        const process = await ProcessModel.findOne({ where: {id: processId }});
        res.status(200).json(process);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteProcess = async (req, res) => {
    const processId = req.params.id;
    try {
        await ProcessModel.destroy({ where: {id: processId} });
        return res.status(201).send({ message: 'Process deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};
