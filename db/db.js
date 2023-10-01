import {createConnection} from "mysql2";
import * as fs from 'fs/promises';

async function loadConfig() {
    try {
        const configData = await fs.readFile('./config.json', 'utf8');
        const config = JSON.parse(configData);
        return config;
    } catch (error) {
        console.error('Error reading config.json:', error);
        throw error;
    }
}
const config =await loadConfig()

export const connect = () =>  createConnection(config)
