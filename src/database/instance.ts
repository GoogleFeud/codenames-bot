
import {Sequelize} from "sequelize";

export const Provider = new Sequelize("database", "user", undefined, {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: `${__dirname}/data`,
});