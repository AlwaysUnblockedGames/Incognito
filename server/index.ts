import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import { httpFactory } from './http.js';
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
import { baremuxPath } from '@mercuryworkshop/bare-mux';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = fastify({ logger: false, serverFactory: httpFactory })

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'src'),
  prefix: '/',
  serve: true,
  wildcard: false
});

app.register(fastifyStatic, {
    root: epoxyPath,
    prefix: '/epoxy',
    serve: true,
    wildcard: true,
    decorateReply: false
});

app.register(fastifyStatic, {
    root: baremuxPath,
    prefix: '/baremux',
    serve: true,
    wildcard: true,
    decorateReply: false,
})

app.register(fastifyStatic, {
    root: uvPath,
    prefix: '/uv',
    serve: true,
    wildcard: true,
    decorateReply: false
})

app.get("/search=:query", async (req, res) => {
  const { query } = req.params as { query: string }; // Define the type for req.params

  const response = await fetch(
    `http://api.duckduckgo.com/ac?q=${query}&format=json`
  ).then((apiRes) => apiRes.json());

  res.send(response);
});

app.setNotFoundHandler((req: any, res: any) => {
  res.sendFile("index.html"); // SPA catch-all
});


//@ts-expect-error fuck off no one cares
const prt = parseInt(process.env.PORT) || 3000;

console.log(chalk.green(`Server running at http://localhost:${prt}`));
console.log(chalk.magenta(`Server also running at http://0.0.0.0:${prt}`));
console.log(chalk.red('Press Ctrl+C to quit'));
app.listen({ port: prt, host: '0.0.0.0' });
