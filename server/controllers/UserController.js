import UserModel from '../models/UserModel.js';


export const getAllUsers = async (request, response) =>{
    try {
        const users = await UserModel.find();
        response.status(200).json(users);
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

export const addUser = async (req, res) => {
    try {
        const addNewUser = await UserModel.insertMany(req.body);
        res.status(201).json(addNewUser);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}
