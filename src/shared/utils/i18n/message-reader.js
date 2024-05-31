import fs from 'fs';
import path from 'path';
import { getCurrentDirPath } from '../paths.js';
export const loadMessageBundle=()=>{
    const __dirname = getCurrentDirPath();
    console.log('LANG ***** ', process.env.LANGUAGE);
    const jsonPath = path.join(__dirname,'/i18n',process.env.LANGUAGE+".json");
    console.log('Current dir path ', __dirname);
    const messages = JSON.parse(fs.readFileSync(jsonPath));
    return messages;
}
