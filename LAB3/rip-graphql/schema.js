export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # Заявка на організацію ритуальних послуг; owner — користувач, який її створив
  type Application {
    id: ID!
    phone: String!
    comment: String!
    status: String!
    owner: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    me: User
    applications: [Application!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createApplication(phone: String!, comment: String): Application!
    deleteApplication(id: ID!): Boolean!
  }
`;
