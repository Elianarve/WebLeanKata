import ActualStateModel from "../models/ActualStateModel.js";
import searchModel from "../helpers/searchHelper.js";

export const getActualState = async (request, response) =>{
    try {
        const actualState = await ActualStateModel.findAll();
        response.status(200).json(actualState);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addActualState = async (req, res) => {
    try {
        
        let count = 1;
        const idChallenge = await ActualStateModel.findOne({order: [['id', 'DESC']]});
       
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
       const response = await ActualStateModel.update(req.body,{  where: {id: actualStateId}});
       console.log(response + "respuesta actualizar modelo")
       const actualStateUpdated = await ActualStateModel.findOne({where: {id: actualStateId}});
       console.log(actualStateUpdated + "modelo actualizado")
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

export const searchActualState = async (req, res) => {
    const searchText = req.query.searchText;
    try {
        const searchResults = await searchModel(ActualStateModel, 'name', searchText);
        res.json(searchResults);
    } catch (error) {
        console.error('Error al buscar estados actuales:', error);
        res.status(500).json({ error: 'Error al buscar estados actuales' });
    }
};