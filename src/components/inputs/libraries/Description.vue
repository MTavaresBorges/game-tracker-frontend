<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits();

const description = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    description.value = newValue;
  }
);

const updateValue = () => {
    emit('update:modelValue', description.value);
};

</script>

<template>
    <div class="col-span-12 flex flex-col">
        <label class="text-lg mb-1 text-left w-full mt-4">Description</label>
        <textarea v-model="description" @input="updateValue" type="text" placeholder="Type your library description" class="resize-none h-32 bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>