<script setup>
import { defineEmits } from 'vue';

defineProps({
    modelValue: {
        type: File,
        default: null,
    },
});

const emit = defineEmits(['update:modelValue']);

function updateFile(event) {
    const file = event.target.files[0];
    if (file) {
        emit('update:modelValue', file);
    }
}

</script>

<template>
    <div class="col-span-12 flex flex-col">
        <label class="text-lg mt-6 text-left w-full">Cover Image</label>
        <input type="file" @change="updateFile" accept="image/*" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>