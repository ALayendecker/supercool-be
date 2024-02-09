const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (parent, args, context, __)=> {
      const users = await User.find()
      return users
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log(user);
      return { token, user };
    },
  }
};

module.exports = resolvers;
