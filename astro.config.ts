import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
//@ts-expect-error No types
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
import { libcurlPath } from '@mercuryworkshop/libcurl-transport';
import playformCompress from '@playform/compress';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, envField } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';
//we need the buildOpts from here : D
import { parsedDoc } from './server/config/config.ts';
const scramjetPath = `${import.meta.dirname}/vendor/scramjet/dist/`

// https://astro.build/config
export default defineConfig({
    site: Deno.env.get('SITE') || 'https://localhost:8080',
    integrations: [
        tailwind(),
        robotsTxt(),
        sitemap(),
        icon(),
        playformCompress({
            CSS: false,
            HTML: true,
            Image: true,
            JavaScript: true,
            SVG: true,
        }),
    ],
    output: 'static',
    env: {
        schema: {
            GAMES_LINK: envField.boolean({
                context: 'client',
                access: 'public',
                default: parsedDoc.buildOpts.games,
            }),
            SEO: envField.boolean({
                context: 'client',
                access: 'public',
                default: Boolean(Deno.env.get('SEO')) || parsedDoc.seo.enabled
            })
        },
    },
    vite: {
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: `${uvPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'uv',
                        overwrite: false,
                    },
                    {
                        src: `${epoxyPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'epoxy',
                        overwrite: false,
                    },
                    {
                        src: `${libcurlPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'libcurl',
                        overwrite: false,
                    },
                    {
                        src: `${baremuxPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'baremux',
                        overwrite: false,
                    },
                    {
                        src: `${scramjetPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'scram',
                        overwrite: false
                    }
                ],
            }),
        ],
        server: {
            proxy: {
                '/wisp/': {
                    target: 'wss://ruby.rubynetwork.co/wisp/',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(/^\/wisp\//, ''),
                },
                '/gms/': {
                    target: 'https://rawcdn.githack.com/ruby-network/ruby-assets/main/',
                    changeOrigin: true,
                    ws: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/gms\//, ''),
                },
            },
        },
    },
});
