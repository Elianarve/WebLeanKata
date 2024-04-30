import { Op } from 'sequelize';

export const searchModel = async (Model, searchField, searchText) => {
    try {
        const searchResults = await Model.findAll({
            where: {
                [searchField]: {
                    [Op.like]: `%${searchText}%`
                }
            }
        });

        return searchResults;
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        throw new Error('Error en la búsqueda');
    }
};