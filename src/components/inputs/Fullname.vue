<script setup>
import { ref, defineEmits } from 'vue';

const fullname = ref('');

const emit = defineEmits();

const updateValue = () => {
    emit('update:modelValue', fullname.value);
};

</script>

<template>
    <div class="col-span-12 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Fullname</label>
        <input v-model="fullname" @input="updateValue" type="text" placeholder="Type your entire name" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>