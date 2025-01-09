import gradient from 'npm:gradient-string';
import chalk from 'chalk';
const listeningMessage = (port: number, server: 'fastify' | 'hono') => {
    const message = `
     ___                       _ _        
    |_ _|_ __   ___ ___  _ __ (_) |_ ___  
    | || '_ \\ / __/ _ \\| '_ \\| | __/ _ \\ 
    | || | | | (_| (_) | | | | | || (_) |
    |___|_| |_|\\___\\___/|_| |_|_|\\__\\___/
    `;
    const messageColors = {
        green: '#34b874',
        white: '#ffffff',
        blue: '#161923',
    };
    console.log(gradient(Object.values(messageColors)).multiline(message));
    console.log(
        `${chalk.hex('#34b874')('Server listening on')} ${
            chalk.white.bold('http://localhost:' + port)
        }`,
    );
    console.log(
        chalk.white.bold(
            `Server also listening on ${chalk.hex('#34b874').bold('http://0.0.0.0:' + port)}`,
        ),
    );
    console.log(
        chalk.hex('#34b874').bold(
            `The server in use ${
                server === 'fastify'
                    ? chalk.bold.whiteBright('Fastify (Not Deno native, includes wisp server)')
                    : chalk.bold.whiteBright('Hono (no wisp server, deno-native)')
            }`,
        ),
    );
};

export { listeningMessage };
