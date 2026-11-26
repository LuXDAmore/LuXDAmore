<template>
    <u-app :locale="it">
        <nuxt-page />
    </u-app>
</template>

<script setup lang="ts">
    // ?: le stringhe interne dei componenti Nuxt UI seguono la lingua del sito (`lang="it"`).
    import { it } from '@nuxt/ui/locale';
</script>
