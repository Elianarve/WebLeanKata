import ActualStateModel from "../models/ActualStateModel.js";

export const getActualState = async (request, response) =>{
    try {
        const actualstate = await ActualStateModel.findAll();
        response.status(200).json(actualstate);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addActualState = async (req, res) => {
    try {
        
        let count = 1;
        const idChallenge = await ActualStateModel.findOne({}, { sort: { 'created' : -1 } });
       
        if (idChallenge) {
            const numberId = parseInt(idChallenge.id.slice(2));
            count = numberId + 1;
        } 
        const formatted_Id = 'EA' + count.toString().padStart(3, '0');
        console.log(formatted_Id)
        const addAcState = await ActualStateModel.create({  id: formatted_Id, ...req.body, });
        res.status(201).json(addAcState);
    }catch(error){
        console.log(error)
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateActualState = async (req, res) => {   
    const actualStateId = req.params.id; 
    try {
        await ActualStateModel.update(req.body,{  where: {id: actualStateId}});
        await ActualStateModel.findOne({where: {id: actualStateId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneActualState = async (req, res) =>{
    const actualStateId = req.params.id;
    try {
        const actualState = await ActualStateModel.findOne({ where: {id: actualStateId }});
        res.status(200).json(actualState);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteActualState = async (req, res) => {
    const actualStateId = req.params.id;
    try {
        await ActualStateModel.destroy({ where: {id: actualStateId} });
        return res.status(201).send({ message: 'Challenge deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};