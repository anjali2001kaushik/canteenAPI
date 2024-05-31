import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const getCurrentDirPath=()=> {   
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('Current Dir Path ', __dirname);
return __dirname;
}