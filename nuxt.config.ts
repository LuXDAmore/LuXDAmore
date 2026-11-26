import { defineNuxtConfig } from 'nuxt/config';

// Sito statico: `pnpm generate` scrive `.output/public`, caricato a mano via FTP (docs/01-ambienti-e-deploy.md).
export default defineNuxtConfig(
    {

        app: {
            // ?: fallback per le pagine 200.html e 404.html generate; la homepage li sovrascrive con useSeoMeta.
            head: {
                htmlAttrs: { lang: 'it' },
                meta: [
                    {
                        content: 'Portfolio di Luca Iaconelli, front-end developer e fotografo.',
                        name: 'description',
                    },
                ],
                title: 'Luca Iaconelli',
            },
        },

        compatibilityDate: '2026-06-01',

        css: [ '~/assets/css/main.css' ],

        modules: [
            '@nuxt/test-utils/module',
            '@nuxt/eslint',
            '@nuxt/ui',
        ],

    }
);
