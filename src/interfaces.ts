import { JWTUser } from "./utils/jwt-user.js";

export interface GraphQLContext {
    user?: JWTUser
}