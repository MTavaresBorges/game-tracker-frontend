<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};

</script>

<template>
    <div class="col-span-4 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Zipcode</label>
        <input @input="updateValue" :value="modelValue" type="number" maxlength="8" placeholder="Type your zipcode" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>

<style scoped>
/* Remove as setas no Chrome, Safari e Edge */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Remove as setas no Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>