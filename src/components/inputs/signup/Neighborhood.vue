<script setup>
import { ref, defineEmits } from 'vue';

const neighborhood = ref('');

const emit = defineEmits();

const updateValue = () => {
    emit('update:modelValue', neighborhood.value);
};
</script>

<template>
    <div class="col-span-10 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Neighborhood</label>
        <input v-model="neighborhood" @input="updateValue" type="text" placeholder="Type your neighborhood" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>