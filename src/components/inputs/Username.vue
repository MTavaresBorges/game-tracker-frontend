<script setup>
import { ref, defineEmits } from 'vue';

const username = ref('');

const emit = defineEmits();

const updateValue = () => {
    emit('update:modelValue', username.value);
};
</script>

<template>
    <div class="col-span-6 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Username</label>
        <input v-model="username" @input="updateValue" type="text" placeholder="Type your username" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>