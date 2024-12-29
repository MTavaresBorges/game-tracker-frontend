<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import axios from 'axios';

const { modelValue } = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
const cities = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos');
        cities.value = response.data;
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
        <label class="text-lg mb-1 text-left w-full">City</label>
        <select :value="modelValue" @input="updateValue" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600">
            <option v-for="city in cities" :key="city.id" :value="city.nome" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600">
                {{ city.nome }}
            </option>
        </select>
    </div>
</template>