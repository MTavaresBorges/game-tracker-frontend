<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits();

const password = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    password.value = newValue;
  }
);

const updateValue = () => {
    emit('update:modelValue', password.value);
};
</script>

<template>
    <div class="col-span-6 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Password</label>
        <input v-model="password" @input="updateValue" type="password" placeholder="Type your password" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>