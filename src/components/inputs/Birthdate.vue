<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    modelValue: String,
});

const emit = defineEmits();

const birthdate = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    birthdate.value = newValue;
  }
);

const updateValue = () => {
    emit('update:modelValue', birthdate.value);
};
</script>

<template>
    <div class="col-span-4 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">{{ label }}</label>
        <input v-model="birthdate" @input="updateValue" type="date" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>