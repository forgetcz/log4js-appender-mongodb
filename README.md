## og4js-node-next mongo appender

This is custom appender for [log4js-node-next](https://www.npmjs.com/package/log4js-node-next) appender.
Sends log events to a [mongo](https://www.mongodb.com/) database.
Optional to use with [log4js-layouts](https://www.npmjs.com/package/log4js-layouts)

The full documentation is available [here](https://github.com/forgetcz/log4js-appender-mongodb).

## Simple Example

```bash
npm i log4js-node-next
npm install log4js-appender-mongodb
npm install os
```
## Example

```Typescript
import { configureLogger, getLogger, logLevels } from 'log4js-node-next';
import { eCoreAppenderType } from 'log4js-node-next/dist/types/enums.js';

if (require.main === module) {
    configureLogger({
        appenders: {
            consoleAppender: {
                type: eCoreAppenderType.console,
            },
        },
        categories: {
            default: {
                appenders: [`hangoutAlert`],
                minLevel: logLevels.DEBUG,
                maxLevel: logLevels.FATAL,
            },
        },
    })
        .then(() => {
            const logger = getLogger();
            const debugFunctions = logger.debug('Debug message...');

            Promise.allSettled(debugFunctions).then((res) => {
                const resErr = res.filter((f) => f.status === 'rejected');

                if (resErr.length > 0) {
                    console.error('There is a error in debugger processing');
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

```