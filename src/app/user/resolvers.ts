import { User } from "@prisma/client";
import { GraphQLContext } from "../../interfaces.js";
import JWTService from "../../services/jwt.js";
import { getUserByEmail, createUser, getUserById } from "../../services/user.js";
import { UserProfile } from "../../utils/user-profile.js";

const queries = {
    generateUserToken: async (parent: any, { data }: { data: UserProfile}) => {
        // check if user exists
        const user = await getUserByEmail(data.email);

        if (!user) {
            // create user and return token
            const user = await createUser(data);
            if (!user) {
                return null;
            }

            const token = await JWTService.generateToken(user.email);
            return token;
        }

        const token = await JWTService.generateToken(user.email);
        return token;
    },
    getCurrentUser: async (parent: any, args: any, context: GraphQLContext) => {
        //console.log("Context:", context)
        if (!context.user || !context.user.id) {
            return null;
        }

        const user = await getUserById(context.user.id);
        if (!user) {
            return null;
        }

        return user;
    }
};

export const resolvers = {
    queries,
};
