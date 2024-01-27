import * as mongodb from 'mongodb';
import { IMongoDefinition } from './types/types';

let client: mongodb.MongoClient;
let collection: mongodb.Collection;

const mongoClient = mongodb.MongoClient;

/**
 * @description It keeps MongoDb connection in RAM.
 *
 * @export
 * @param {IMongoDefinition} config Configuration to mongo
 * @return {Promise<mongodb.Collection>}
 */
export async function getMongoDb(
    config: IMongoDefinition,
): Promise<mongodb.Collection> {
    if (collection) {
        return collection;
    } else {
        try {
            const newClient = await mongoClient.connect(
                config.url,
                config.options,
            );
            client = newClient;
            const db = client.db(config.database);
            collection = db.collection(config.collection);
            return collection;
        } catch (err) {
            const logErr = {
                error: err as Error,
                extraInfo: {
                    function: `${__filename}[${getMongoDb.name}]`,
                    config: config,
                },
            };

            console.error(logErr);

            throw logErr.error;
        }
    }
}
