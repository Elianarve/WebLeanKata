import UsersModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const getUser = async (req, res) => {
    try {
        const news = await UsersModel.findAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await UsersModel.destroy({ where: { id: userId } });
        return res.status(201).send({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const createdNewUser = await UsersModel.create(req.body);
        res.status(201).json(createdNewUser);
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        await UsersModel.update(req.body, { where: { id: userId } });
        res.status(200).json({ message: `User ${userId} successfully updated` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOneUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UsersModel.findOne({ where: { id: userId } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getUser, deleteUser, createUser, updateUser, getOneUser };
