import * as mongodb from 'mongodb';
import { getMongoDb } from './get-mongo-db';
import { isMongoDefinition } from './helpers/is-mongo-definition';
import { IMongoAppenderConfiguration } from './types/types';

/**
 * @description Init mongodb collection
 *
 * @export
 * @param {(mongodb.Collection | undefined)} dbCollection Saved connection
 * @param {IMongoAppenderConfiguration} config Configuration to mongo
 * @return {Promise<mongodb.Collection>}
 */
export async function getMongoCollection(
    dbCollection: mongodb.Collection | undefined,
    config: IMongoAppenderConfiguration,
): Promise<mongodb.Collection> {
    if (dbCollection) {
        return dbCollection;
    } else if (config) {
        if (isMongoDefinition(config.mongoSetting)) {
            const db = await getMongoDb(config.mongoSetting);
            return db;
        } else {
            const result: mongodb.Collection = config.mongoSetting.client
                .db(config.mongoSetting.database)
                .collection(config.mongoSetting.collection);
            return result;
        }
    } else {
        throw new Error('No config or collection is defined!');
    }
}
