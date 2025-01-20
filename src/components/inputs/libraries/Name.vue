<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits();

const name = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    name.value = newValue;
  }
);

const updateValue = () => {
    emit('update:modelValue', name.value);
};

</script>

<template>
    <div class="col-span-12 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Name</label>
        <input v-model="name" @input="updateValue" type="text" placeholder="Type your library name" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>