<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
    modelValue: String,
    colSpan: {
      type: [String, Number],
      default: 1,
    }
});

const emit = defineEmits();

const username = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    username.value = newValue;
  }
);

const updateValue = () => {
    emit('update:modelValue', username.value);
};

</script>

<template>
    <div :class="`col-span-${colSpan} flex flex-col`">
        <label class="text-lg mb-1 text-left w-full">Username</label>
        <input v-model="username" @input="updateValue" type="text" placeholder="Type your username" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>