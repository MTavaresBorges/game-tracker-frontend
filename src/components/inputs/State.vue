<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import axios from 'axios';

const { modelValue } = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
const states = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/states');
        states.value = response.data;
    } catch (error) {
        console.error("Erro ao carregar os estados:", error);
    }
});

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="col-span-3 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">State</label>
        <select :value="modelValue" @input="updateValue" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600">
            <option v-for="state in states" :key="state.uf" :value="state.uf" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600">
                {{ state.name }}
            </option>
        </select>
    </div>
</template>