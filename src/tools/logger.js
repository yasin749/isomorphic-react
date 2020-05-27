const logger = global.$logger;

class Logger {
    static setLog(requestUrl, fileName, message, methodName) {
        if (logger) {
            logger.addContext('filePath', fileName);
            logger.addContext('request', 'Request: ' + requestUrl + '.');
            logger.addContext('methodName', methodName);
            logger.error(message);
        }
    }

    static info(filePath, methodName, message, consoleError) {
        if (consoleError) {
            console.info(consoleError);
            return;
        }

        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }

        console.log(new Date().toISOString() + ' [info] (' + filePath + ':' + methodName + ') Message: ' + message);
    }

    static warn(filePath, methodName, message) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }

        console.log(new Date().toISOString() + ' [warn] (' + filePath + ':' + methodName + ') Message: ' + message);
    }

    static error(filePath, methodName, message, consoleError) {
        if (consoleError) {
            console.error(consoleError);
            return;
        }
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }

        console.log(new Date().toISOString() + ' [error] (' + filePath + ':' + methodName + ') Message: ' + message);
    }
}

module.exports = Logger;
