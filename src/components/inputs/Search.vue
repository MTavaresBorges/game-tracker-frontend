<script setup>
import { ref, defineEmits } from 'vue';

const search = ref('');

const emit = defineEmits();

const updateValue = () => {
    emit('update:modelValue', search.value);
};
</script>

<template>
    <div class="col-span-6 flex flex-col">
        <input v-model="search" @input="updateValue" placeholder="Type a game name" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>