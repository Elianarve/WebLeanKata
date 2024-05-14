import MentalContrast from '../models/MentalContrastModel.js';
import TargetStateModel from "../models/TargetStateModel.js";

export const getMentalContrast = async (request, response) =>{
    try {
        const mentalContrast = await MentalContrast.findAll();
        response.status(200).json(mentalContrast);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addMentalContrast = async (req, res) => {
    try {
        
        let count = 1;
        const idMentalContrast = await MentalContrast.findOne({order: [['id', 'DESC']]});
       
        if (idMentalContrast) {
            const numberId = parseInt(idMentalContrast.id.slice(2));
            count = numberId + 1;
        } 
        const formatted_Id = 'CM' + count.toString().padStart(3, '0');
 
        const addContrastMental = await MentalContrast.create({  id: formatted_Id, ...req.body });
        res.status(201).json(addContrastMental);
    }catch(error){
        console.log(error)
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateMentalContrast = async (req, res) => {   
    const mentalContrastId = req.params.id; 
    try {
        await MentalContrast.update(req.body,{  where: {id: mentalContrastId}});
        await MentalContrast.findOne({where: {id: mentalContrastId}});
        res.status(200).json({message: `Actualizado correctamente`});
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const getOneMentalContrast = async (req, res) =>{
    const mentalContrastId = req.params.id;
    try {
        const mentalContrast = await MentalContrast.findOne({ where: {id: mentalContrastId }});
        res.status(200).json(mentalContrast);
    } catch(error) {
        res.status(500).json({message: error.message});
    }   
}

export const deleteMentalContrast = async (req, res) => {
    const mentalContrastId = req.params.id;
    try {
        await MentalContrast.destroy({ where: {id: mentalContrastId} });
        return res.status(201).send({ message: 'Mental contrast deleted' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};