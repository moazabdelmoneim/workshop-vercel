import { config } from "dotenv";
import path from "node:path"

config({path:path.resolve('./config/.env')})

export const appConfig ={
	port : process.env.PORT,
	db_url : process.env.DBURI
}