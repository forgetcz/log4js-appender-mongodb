import { IConfiguration, getLogger, logLevels } from 'log4js-node-next';
import { configureLogger } from 'log4js-node-next/dist';
import { IMongoAppenderConfiguration } from '../types/types';

async function runIt(): Promise<void> {
    const config: IConfiguration = {
        appenders: {
            mongoAppender: {
                type: 'log4js-db-mongodb-esnext',
                mongoSetting: {
                    url: 'mongodb+srv://logging:iyBQ4FxqWOHwQiOI@test.wsttp.mongodb.net/messenger',
                    database: 'messenger',
                    collection: 'log',
                },
            } as IMongoAppenderConfiguration,
        },
        categories: {
            default: {
                appenders: [`mongoAppender`],
                minLevel: logLevels.DEBUG,
                maxLevel: logLevels.FATAL,
            },
        },
    };

    await configureLogger(config);
    const logger = getLogger('xxxxxxxxxx');
    logger.error({ c: 'a', i: { c: 'a', l: 1 } });
}

if (require.main === module) {
    runIt();
}
