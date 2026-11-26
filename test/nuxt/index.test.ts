import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import IndexPage from '~/pages/index.vue';

describe(
    'homepage',
    () => {

        it(
            'ha un h1 con il nome dentro il main',
            async() => {

                const wrapper = await mountSuspended( IndexPage )
                    , heading = wrapper.find( 'main h1' );

                expect( heading.exists() ).toBe( true );
                expect( heading.text() ).toBe( 'Luca Iaconelli' );

            }
        );

    }
);
