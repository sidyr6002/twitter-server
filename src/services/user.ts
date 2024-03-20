import { User } from "@prisma/client";
import { prisma } from "../client/db/index.js";
import { UserProfile } from "../utils/user-profile.js";


export const getUserById = async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    return user;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return user;
};

export const createUser = async (userData: UserProfile): Promise<User | null> => {
    if (!userData || !userData.email) {
        return null;
    }

    const user = await prisma.user.create({
        data: userData
    });

    return user;
};