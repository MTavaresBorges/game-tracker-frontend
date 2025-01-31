<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits();

const email = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    email.value = newValue;
  }
);

const updateValue = () => {
    emit('update:modelValue', email.value);
};

</script>

<template>
    <div class="col-span-8 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Email</label>
        <input v-model="email" @input="updateValue" type="email" placeholder="Type your email" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>