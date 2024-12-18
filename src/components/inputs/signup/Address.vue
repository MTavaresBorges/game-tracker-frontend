<script setup>
import { ref } from 'vue';

const address = ref('');
</script>

<template>
    <div class="col-span-8 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Address</label>
        <input v-model="address" type="text" placeholder="Type your address" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>