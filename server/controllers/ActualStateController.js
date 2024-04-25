import ActualStateModel from "../models/ActualStateModel.js";

export const getAllActualState = async (request, response) =>{
    try {
        const actualstate = await ActualStateModel.find();
        response.status(200).json(actualstate);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addActualState = async (req, res) => {
    try {
        const addActualState = await ActualStateModel.insertMany(req.body);
        res.status(201).json(addActualState);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}
