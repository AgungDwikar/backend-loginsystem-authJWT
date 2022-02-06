import express from "express";
import cors from "cors";
import "dotenv/config";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models, { sequelize } from "./models/init-models";
import routes from "./routes/indexRoute";
// import routes from "./routes/indexRoute";
// import middleware from "./middleware/middleware";

const app = express();
const port = process.env.PORT || 3007;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
// kegunaan cors adalah kita dapat mengakses api di luar domain
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(async (req, res, next) => {
    req.context = { models };
    next();
});

app.use(process.env.URL_API + "/users", routes.userRoute);

const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
    if (dropDatabaseSync) {
        console.log("database do not drop");
    }
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    });
});

export default app;
