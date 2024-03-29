const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query{
    users:[User] 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
