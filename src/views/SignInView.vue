<template>
    <main class="text-center container mx-auto text-white">
        <div class="border border-gray-300 rounded-xl shadow-lg mt-10 w-[40%] mx-auto">
            <div class="p-6 font-bold text-2xl font-roboto">
                Welcome!
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 items-center border border-gray-300 rounded-xl shadow-lg mt-10 w-[40%] mx-auto p-6">
            <div class="col-span-12 flex flex-col">
                <label class="text-lg mb-1 text-left w-full">Username</label>
                <input v-model="username" type="text" placeholder="Type your username" class="p-2 rounded-lg w-full text-gray-600"/>
            </div>
            <div class="col-span-12 flex flex-col">
                <label class="text-lg mb-1 text-left w-full">Password</label>
                <input v-model="password" type="password" placeholder="Type your password" class="p-2 rounded-lg w-full text-gray-600"/>
            </div>
        </div>

        <div>
            <button class="border rounded-xl shadow-lg mt-10 w-[15%] mx-auto p-6 font-bold text-2xl font-roboto bg-blue-600 hover:bg-blue-700">
                Sign Up
            </button>
        </div>
    </main>
</template>

<script setup>

</script>

<style scoped>
    /* This removes the arrows from the input type="number" */
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox only */
    input[type='number'] {
        -moz-appearance: textfield; 
    }
</style>