<script setup>
import { ref, defineEmits } from 'vue';

const zipcode = ref('');

const emit = defineEmits();

const updateValue = () => {
    emit('update:modelValue', zipcode.value);
};
</script>

<template>
    <div class="col-span-4 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Zipcode</label>
        <input v-model="zipcode" @input="updateValue" type="number" maxlength="8" placeholder="Type your zipcode" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>