<template>
    <div>
        <h2>Grid View</h2>
        <p>{{data.name}}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GridView',
  props: {
    data: Object,
  },
});
</script>