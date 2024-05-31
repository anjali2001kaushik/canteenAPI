import express from "express"
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import { userRouter } from "./src/modules/routes/user-route.js";
import {adminRouter} from "./src/modules/routes/admin-routes.js"
import { dbConnectionLoad } from "./src/shared/db/Connection.js";
import { error404 } from "./src/modules/routes/404.js";
// import permissionRouter from "./src/modules/routes/";
// import roleRouter from "./modules/user/routes/role-route.js";
import cookieParser from "cookie-parser";
import ErrorMiddleWare, { callme } from "./src/middlewares/Error.js";
dotenv.config();

const app = express();
// app - small
// middleware - it is just a function (request, response, next)
// app.use(middlewares)
const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};
app.use(cors(corsOptions));
//app.use(middleware)
app.use(express.json());
app.use(cookieParser());
//app.use(authorization()); // check user authorization
app.use("/", userRouter);
app.use("/admin",adminRouter);

// app.use("/roles", roleRouter);
// app.use("/permissions", permissionRouter);
//app.use(callme());
app.use(ErrorMiddleWare);
app.use(error404);

const promise = dbConnectionLoad();
promise
  .then((result) => {
    console.log("DB Connection Establish");
    const server = app.listen(process.env.PORT || 1234, (err) => {
      if (err) {
        console.log(chalk.red.bold.underline("Server Crash "), err);
      } else {
        console.log(
          chalk.green.bold.underline("Server Up and Running "),
          server.address().port
        );
      }
    });
  })
  .catch((err) => {
    console.log("DB Connection Fails.", err);
  });
