var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

module.exports = {
    appenders: {
        out: { type: 'stdout' },
        errorLogger: { type: 'dateFile', filename: `${__dirname}/../logs/error/errorLogger.log`, alwaysIncludePattern: true },
        resLogger: { type: 'dateFile', filename: `${__dirname}/../logs/response/resLogger.log`, alwaysIncludePattern: true },
        recordsLogger: { type: 'dateFile', filename: `${__dirname}/../logs/recordsLogger/recordsLogger.log`, alwaysIncludePattern: true },
    },
    categories: {
        default: { appenders: ['out'], level: 'all' },
        errorLogger: { appenders: ['errorLogger'], level: 'error' },
        resLogger: { appenders: ['resLogger'], level: 'info' },
        recordsLogger: { appenders: ['recordsLogger'], level: 'info' },
    }
}
