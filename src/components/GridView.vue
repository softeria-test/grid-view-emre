<template>
    <div>
        <h2>Grid View</h2>
        <p>{{data}}</p>
    </div>
</template>
<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps({
    data:String
})

</script>