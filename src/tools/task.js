const Logger = require('./logger');

function run(task, action, ...args) {
    const command = process.argv[2];
    const taskName = command && !command.startsWith('-') ? `${task}:${command}` : task;
    const start = new Date();

    Logger.info('tools/task.js', 'run', `Starting '${taskName}'...\n`);

    return Promise.resolve()
        .then(() => action(...args))
        .then(() => {
            Logger.info('tools/task.js', 'run', `Finished '${taskName}' after ${new Date().getTime() - start.getTime()}ms\n`);
        })
        .catch(err => Logger.info('tools/task.js', 'run', `${err.stack}\n`));
}

process.nextTick(() => require.main.exports());

module.exports = (task, action) => run.bind(undefined, task, action);
