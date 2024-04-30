import { Op } from 'sequelize';

const searchModel = (model, searchQuery) => {
  const search = searchQuery.trim();
  return model.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ],
    },
  });
}

export default searchModel;