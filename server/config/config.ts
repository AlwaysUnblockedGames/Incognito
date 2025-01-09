import { parse } from "smol-toml";

interface Data {
    buildOpts: {
        games: boolean;
    };
    server: {
        wisp: boolean;
        port: number;
    };
    seo: {
        enabled: boolean;
        both: boolean;
        domain: string;
    };
}

const doc = await Deno.readTextFile(`${Deno.cwd()}/config.toml`);
const parsedDoc = parse(doc) as unknown as Data;

if (typeof parsedDoc.buildOpts !== "object") {
    throw new Error(`Invalid structure: "buildOpts" should be an object`);
}
if (typeof parsedDoc.server !== "object") {
    throw new Error(`Invalid structure: "server" should be an object`);
}
if (typeof parsedDoc.buildOpts.games !== "boolean") {
    throw new Error(`Invalid type for "buildOpts.games"! It should be a boolean (true/false)`);
}
if (typeof parsedDoc.server.wisp !== "boolean") {
    throw new Error(`Invalid type for "server.wisp"! It should be a boolean (true/false)`);
}
if (typeof parsedDoc.server.port !== "number") {
    throw new Error(`Invalid type for "server.port"! It should be a number`);
}
if (typeof parsedDoc.seo.enabled !== "boolean") {
    throw new Error(`Invalid type for "seo.enabled"! It should be an boolean (true/false)`);
}
if (typeof parsedDoc.seo.both !== "boolean") {
    throw new Error(`Invalid type for "seo.both"! It should be an boolean (true/false)`);
}
if (typeof parsedDoc.seo.domain !== "string") {
    throw new Error(`Invalid type for "seo.domain"! It should be an string`);
} else {
    try {
        new URL(parsedDoc.seo.domain);
    } catch (e: any) {
        throw new Error(e);
    }
}

export { type Data as TOMLConfig, parsedDoc };
