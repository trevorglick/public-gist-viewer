import models from "../../models";

export const resolvers = {
  Query: {
    favorited: async () => {
      return await models.favorite.findAll({where: {favorited: true}});
    },
    getFavorite: async (parent, { id }) => {
      return await models.favorite.findOne({where: {id}})
    }
  },

  Mutation: {
    setFavorited: async (parent, { id, userName, description, favorited }) => {
      const doesExist = await models.favorite.findOne({where: {id}});
      if (!doesExist) { 
        await models.favorite.create({id, userName, description, favorited});
        return await models.favorite.findOne({where: {id}});
      }
      await models.favorite.update({favorited}, {where: {id}})
      return await models.favorite.findOne({where: {id}});
    }
  }
};
