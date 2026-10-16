import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { users, applications, getNextUserId, getNextApplicationId } from './data.js';
import { createToken } from './auth.js';

function authError() {
  return new GraphQLError('Потрібна авторизація.', {
    extensions: { code: 'UNAUTHENTICATED' }
  });
}

export const resolvers = {
  Query: {
    users: () => users,

    me: (parent, args, context) => context.user,

    applications: () => applications
  },

  Mutation: {
    register: async (parent, args) => {
      const { name, email, password } = args;

      const emailTaken = users.some((user) => user.email === email);
      if (emailTaken) {
        throw new GraphQLError('Користувач з таким email вже існує.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: getNextUserId(), name, email, password: hashedPassword };
      users.push(user);

      return { token: createToken(user), user };
    },
    login: async (parent, args) => {
      const { email, password } = args;

      const user = users.find((u) => u.email === email);
      const passwordIsValid = user && (await bcrypt.compare(password, user.password));
      if (!passwordIsValid) {
        throw new GraphQLError('Невірний email або пароль.');
      }

      return { token: createToken(user), user };
    },

    createApplication: (parent, args, context) => {
      if (!context.user) {
        throw authError();
      }

      const application = {
        id: getNextApplicationId(),
        phone: args.phone,
        comment: args.comment || '',
        status: 'new',
        owner: context.user
      };
      applications.push(application);
      return application;
    },

    deleteApplication: (parent, args, context) => {
      if (!context.user) {
        throw authError();
      }

      const index = applications.findIndex((item) => item.id === args.id);
      if (index === -1) {
        return false;
      }
      applications.splice(index, 1);
      return true;
    }
  }
};
