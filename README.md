# Kiyoshi's Blog

[blog.kiyo5hi.com](https://blog.kiyo5hi.com), built with Astro and served as static
HTML by Caddy. There is no application server, content database or client-side
framework. Markdown, formulas and syntax highlighting are compiled during the
build; browser JavaScript is limited to the saved color preference and Giscus.

## Develop and verify

Use Node 24 LTS and the pnpm version pinned in `package.json`:

```sh
corepack enable pnpm
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm test
pnpm preview
```

Tests inspect the actual generated HTML for content/code preservation, historical
dates, formulas, canonical URLs, discussion identity and absence of hydration
payloads. Browser acceptance additionally covers mobile/desktop layout, light/dark
mode, navigation, actual HTTP 404 responses and Giscus loading. Submitting a
comment requires a real GitHub login and is not part of automated acceptance.

## Content

- Articles stay in `content/posts/*.md`; filenames retain `/posts/<name>` URLs.
- Frontmatter requires `title`, `description` and `category`.
- Publication and modification dates come from full Git history. Shallow builds
  fail rather than changing old dates. CI uses `fetch-depth: 0`; run
  `git fetch --unshallow` if your local clone is shallow.
- For an uncommitted draft, explicitly set an ISO `createdAt` (and optionally
  `updatedAt`) in frontmatter. Existing articles need no metadata edits.
- Friend links stay in `content/friends.yaml`.
- Giscus uses the original repository/category IDs and `pathname` mapping.
  Changing an article URL also changes its discussion lookup.

KaTeX CSS/fonts are bundled locally. Tailwind is a build-time stylesheet tool;
the existing design and Shiki light-plus/dark-plus themes are retained. Static
`sitemap.xml`, `robots.txt` and a real error page ship with each build.

## Deployment

The image is built from `deploy/Dockerfile`. Build from a full Git clone so the
build context contains real history; a worktree's `.git` pointer alone cannot be
resolved inside Docker. The native build stage is shared across CPU architectures,
and the final image contains only Caddy, its configuration and `dist/`.

```sh
docker build -f deploy/Dockerfile -t blog:local .
docker run --rm --read-only --cap-drop ALL --cap-add NET_BIND_SERVICE \
  --tmpfs /config --tmpfs /data -p 127.0.0.1:3000:3000 blog:local
```

Caddy runs as UID/GID 10001, listens on port 3000, serves extensionless URLs and
returns HTTP 404 for missing pages. HTML revalidates; hashed assets are immutable.
The official Caddy binary retains its file capability, hence NET_BIND_SERVICE
even though the configured port is unprivileged.

Pushing `main` validates the site and publishes an amd64/arm64 image to GHCR.
Production uses a separately reviewed immutable digest in `homelab-infra`;
publishing an image alone does not switch the running site. Keep the previous
image digest and Compose file for rollback. There is no application data to
migrate or restore.

Implementation references: [Astro content collections](https://docs.astro.build/en/guides/content-collections/),
[Markdown pipeline](https://docs.astro.build/en/guides/markdown-content/),
[syntax highlighting](https://docs.astro.build/en/guides/syntax-highlighting/).
