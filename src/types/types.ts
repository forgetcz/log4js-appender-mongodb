import {
    IAbstractAppenderConfiguration,
    ILayoutConfiguration,
    ILoggingEvent,
    ILoggingFunctionResponse,
    TLayoutFunction,
    TLoggingFunction,
} from 'log4js-node-next';
import * as mongodb from 'mongodb';
import { configure as configureExport, logEvent as logEventExport } from '..';

/**
 * @description Mongo connection with the database and collection
 *
 * @export
 * @interface IMongoClient
 */
export interface IMongoClient {
    /** @description Mongo client for access to db */
    client: mongodb.MongoClient;
    /** @description Mongo database to write */
    database: string;
    /** @description Mongo collection to write */
    collection: string;
}

/**
 * @description Mongo connection definition
 *
 * @export
 * @interface IMongoDefinition
 */
export interface IMongoDefinition {
    /** @description Mongo connection string: MONGO_URL="mongodb://127.0.0.1:27017/is_adapter" */
    url: string;
    /** @description Mongo settings */
    options: mongodb.MongoClientOptions;
    /** @description Mongo database to write */
    database: string;
    /** @description Mongo collection to write */
    collection: string;
    /** @description Mongo debug level */
    /** @deprecated not used any more... */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logLevel?: any;
}

/**
 * @description Mongo configuration definition
 *
 * @export
 * @interface MongoAppenderConfiguration
 */
export interface IMongoAppenderConfiguration {
    /**
     * @description Log4js type : This MUST be the exact match with package.json : "name": "log4js-db-mongodb"
     *
     */
    type: 'log4js-db-mongodb-esnext';
    /** Parent connection to mongoDb or connection properties to mongoDb */
    mongoSetting: IMongoClient | IMongoDefinition;
    /** @description Layout config definition */
    layout: ILayoutConfiguration;
    /** @description if true then use console for output result  */
    consoleLog?: boolean;
}

/**
 * @deprecated use IMongoAppenderConfiguration instead of MongoAppenderConfiguration
 *
 * @export
 * @interface MongoAppenderConfiguration
 * @extends {IMongoAppenderConfiguration}
 */
export interface MongoAppenderConfiguration
    extends IMongoAppenderConfiguration {}
// //////////////////////////////// Export default methods //////////////////////////////////////////////
export function logEvent(
    loggingEvent: ILoggingEvent,
): Promise<ILoggingFunctionResponse> {
    return logEventExport(loggingEvent);
}

export function configure(
    appenderConfig: IAbstractAppenderConfiguration,
    layoutFunction: TLayoutFunction | undefined,
): TLoggingFunction {
    return configureExport(appenderConfig, layoutFunction);
}
// //////////////////////////////// Export default methods //////////////////////////////////////////////
