import {
    IAbstractAppenderConfiguration,
    ILoggingEvent,
    ILoggingFunctionResponse,
    TLayoutFunction,
    TLoggingFunction,
} from 'log4js-node-next';
import * as mongodb from 'mongodb';
import { getMongoCollection } from './get-mongo-collection';
import { IMongoAppenderConfiguration } from './types/types';

/** @description local variable to save connection to database */
let dbConnection: mongodb.Collection;

let localLayoutFunction: TLayoutFunction | undefined;
let localAppenderConfig: IMongoAppenderConfiguration;

export async function logEvent(
    loggingEvent: ILoggingEvent,
): Promise<ILoggingFunctionResponse> {
    try {
        let logData = loggingEvent;
        if (localLayoutFunction) {
            logData = localLayoutFunction(loggingEvent);
        }
        dbConnection = await getMongoCollection(
            dbConnection,
            localAppenderConfig,
        );
        const result = await dbConnection.insertOne(logData);

        if (localAppenderConfig.consoleLog) {
            console.debug(result);
        }
        return {
            loggerName: localAppenderConfig.type,
            loggerResponse: {
                event: loggingEvent,
                layoutTransformation: result,
            },
        };
    } catch (error) {
        const logError = {
            message:
                'Log4JsJsMongodb : Error get connect to mongo / inserting log data.',
            error: error,
            detailInfo: {
                logPrefix: `${__filename}[${logEvent.name}]`,
            },
        };

        console.error(logError); // Write the error in to console (as well as log pm2 log)

        const res: ILoggingFunctionResponse = {
            loggerName: localAppenderConfig.type,
            error: error as Error,
        };

        return res;
    }
}

export function configure(
    appenderConfig: IAbstractAppenderConfiguration,
    layoutFunction: TLayoutFunction | undefined,
): TLoggingFunction {
    localAppenderConfig = appenderConfig as IMongoAppenderConfiguration;
    localLayoutFunction = layoutFunction;
    return logEvent;
}
