import { Express } from "express";
import dotenv from "dotenv";
import { start } from "./app/app.js";

dotenv.config();
const port = process.env.PORT || 3000;

async function init() {
    const app: Express = await start();

    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
}

init().catch((err) => {
    console.error(err);
    process.exit(1);
});