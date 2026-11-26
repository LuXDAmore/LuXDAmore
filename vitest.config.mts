import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

// ?: Web Storage di Node SPENTA nei worker dei test `nuxt`, altrimenti il `localStorage` del DOM
// non arriva mai al global. Da Node 26 (la versione in `.nvmrc`) `localStorage` e `sessionStorage`
// sono proprietà di `globalThis` anche senza `--localstorage-file`, e in quel caso valgono
// `undefined`: Vitest copia le chiavi della window happy-dom sul global solo se lì non esistono già,
// quindi `window.localStorage` resterebbe `undefined`. Col flag le due globali di Node non esistono e
// happy-dom le installa come su Node <= 24. Il flag si passa solo se Node dichiara davvero quelle
// globali: esiste dalla 22.4, e le versioni che non lo conoscono abortirebbero all'avvio del worker.
const webStorageOffArguments = 'localStorage' in globalThis ? [ '--no-experimental-webstorage' ] : [];

// Un solo progetto per ora: i test di componenti e pagine nell'ambiente Nuxt.
export default defineConfig(
    {
        test: {
            projects: [
                await defineVitestProject(
                    {
                        test: {
                            environment: 'nuxt',
                            execArgv: webStorageOffArguments,
                            include: [ 'test/nuxt/**/*.{test,spec}.ts' ],
                            name: 'nuxt',
                            // Il primo `mountSuspended` paga import e transform on-demand dell'albero
                            // (Nuxt UI compreso): a freddo sfora i 5s di default.
                            testTimeout: 30_000,
                        },
                    }
                ),
            ],
        },
    }
);
