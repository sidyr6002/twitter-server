import { User } from "@prisma/client/index";
import jwt from "jsonwebtoken";
import { prisma } from "../client/db/index.js";
import { JWTUser } from "../utils/jwt-user.js";

class JWTService {
    public static generateToken(email: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                reject();
                return;
            }

            const payload: JWTUser = {
                id: user.id,
                email: user.email,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
                expiresIn: "1h",
            });

            resolve(token);
        });
    }

    public static decodeToken(token: string): Promise<JWTUser> {
        return new Promise((resolve, reject) => {
            //console.log("Token:", token);
            jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
                if (err) {
                    //console.log("Error:", err);
                    reject(err);
                }
                //console.log("Decoded: ", decoded);
                resolve(decoded as JWTUser);
            });
        })
        //return jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser
    }
}

export default JWTService;
