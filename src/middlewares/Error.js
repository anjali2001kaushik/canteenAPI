export const callme = ()=>{
    return ErrorMiddleWare;
  }
  const ErrorMiddleWare = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";
    console.log("TOU ENCOUNTERED ERROR",err);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
  export default ErrorMiddleWare;
  