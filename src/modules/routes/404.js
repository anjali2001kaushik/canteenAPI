export const error404 = (request, response)=>{
    response.status(404).json({message:'Resource Not Exist'})
}