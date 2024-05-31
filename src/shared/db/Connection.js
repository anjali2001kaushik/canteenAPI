import mongoose from 'mongoose';
export const dbConnectionLoad = ()=>{
console.log('Connection File Loaded...');
console.log("DB URL ", process.env.DB_URL);
const promise = mongoose.connect(process.env.DB_URL);
return promise;
// promise.then(result=>{   
//     console.log('DB Connected....');
// }).catch(err=>{
//     console.log('DB Connection Fails...');
// })
}
export default mongoose;
