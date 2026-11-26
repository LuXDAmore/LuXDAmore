<template>
    <main>
        <!-- ?: h1 solo per screen reader: la homepage è vuota ma deve restare semantica (spec 001, R3). -->
        <h1 class="sr-only">
            Luca Iaconelli
        </h1>
    </main>
</template>

<script setup lang="ts">
    // SEO
    useSeoMeta(
        {
            description: 'Portfolio di Luca Iaconelli, front-end developer e fotografo.',
            title: 'Luca Iaconelli',
        }
    );

    useHead(
        {
            link: [
                {
                    href: 'https://lucaiaconelli.it/',
                    rel: 'canonical',
                },
            ],
        }
    );
</script>
