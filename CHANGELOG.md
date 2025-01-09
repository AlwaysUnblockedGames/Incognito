# 1.0.0
- The initial rewrite to Astro. Includes:
    - Fully static
    - Easier to build
    - Feels/is faster to use
    - Fixes some bugs
    - Among tons of other stuff

# 1.0.1
- Fixes the games and apps page looking weird

# 1.0.2
- Fixes Dockerfile issues

# 1.0.3
- Turns off Rammerhead by default for now
- Docker env fixes again
- SEO

# 1.0.4
- Bumps RH
- Fixes issues with bare-server-node

# 1.1.0
- Switches to Deno (mostly)
- General bug fixes
- Removes Rammerhead as an option and replaces it with Scramjet (coming soon)
- Removes bare server and adds libcurl as an option
- Adds a different Deno native server (Hono) - Command: `deno task start:standalone`
- Removes Masqr
- No more SSR, it's purely statically generated
- CI fixes and other general improvements
- Configuration is done via TOML over a bunch of environment vars
- Removes Biome in place of Deno's native formatter
- A better roadmap of what should be done in the future.

# 1.1.1
- Fixes a bug where if games aren't enabled it redirects to localhost:8080 over just /
- Fixes a bug where if games aren't enabled, it still loads and compresses images over just ignoring them.

# 1.1.2
- Fixes bugs with apps opening as the full url instead of just the correct link
- Fixes a bug with the iFrame panel where it copies & pastes the full link instead of just the normal link.
- Add Scramjet

# 1.1.3
- Add the notice that ScramJet is in beta and may break

# 1.1.4
- Add the ability to disable/enable SEO or selectively render/show it
- Adds the docker-builds.yml file to show the builds I am doing for the docker images.

# 1.1.5
- Fixes the games (mostly)
