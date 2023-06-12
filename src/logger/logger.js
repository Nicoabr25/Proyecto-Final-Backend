import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const currentEnv = process.env.NODE_ENV || "development";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "cyan"
    }
}

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug", //defino el nivel del transportador
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info", //defino el nivel del transportador
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "/logger/logs/errors.log"),
            level: "error",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors })
            )
        })
    ]
})

//middleware//
export const addLogger = (req, res, next) => {
    if (currentEnv === "development") {
        req.logger = devLogger
    } else {
        req.logger = prodLogger;
    }
    // req.logger.fatal(`nivel fatal`) //defino el tipo de error que lanza, solo se muestran los tipos de error definidos en el transportador o superior [0: error, 1 : warn, 2: info, 3: http, 4 : verbose, 5: debug, 6: silly], en este caso http va ammostrar errores del tipo [error, warn, info y http]  req.logger.debug(`${req.url} - method: ${req.method}`)
    // req.logger.error(`nivel error`)
    // req.logger.warning(`nivel warning`)
    // req.logger.info(`nivel info`)
    // req.logger.http(`nivel http}`)
    // req.logger.debug(`nivel debug`)
    next();

}

export const addLoger2 = () => {
    let currentLogger;
    if (currentEnv === "development") {
        currentLogger = devLogger
    } else {
        currentLogger = prodLogger;
    }
    return currentLogger;
}