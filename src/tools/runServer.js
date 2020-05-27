const path = require('path');
const cp = require('child_process');
const webpackServerConfig = require('../../webpack.server.config');
const Logger = require('./logger');

const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;

let serverProcess;
let pending = true;

const serverPath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename.replace('[name]', 'server'),
);

function runServer() {
    return new Promise(resolve => {
        function onStdOut(data) {
            const match = data.toString('utf8').match(RUNNING_REGEXP);

            Logger.info('src/tools/runServer.js', 'runServer', data.toString());

            if (match) {
                serverProcess.host = match[1];
                serverProcess.stdout.removeListener('data', onStdOut);
                serverProcess.stdout.on('data', x => process.stdout.write(x));
                pending = false;

                resolve(serverProcess);
            }
        }

        if (serverProcess) {
            serverProcess.kill('SIGTERM');
        }

        serverProcess = cp.spawn(
            'node',
            [serverPath],
            {
                env: process.env,
                silent: false,
            }
        );

        if (pending) {
            serverProcess.once('exit', (code, signal) => {
                if (pending) {
                    throw new Error(
                        `Server terminated unexpectedly with code: ${code} signal: ${signal}`,
                    );
                }
            });
        }

        serverProcess.stdout.on('data', onStdOut);
        serverProcess.stderr.on('data', x => process.stderr.write(x));

        return serverProcess;
    });
}

process.on('exit', () => {
    if (serverProcess) {
        serverProcess.kill('SIGTERM');
    }
});

module.exports = runServer;
