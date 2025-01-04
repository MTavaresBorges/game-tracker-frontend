<script>

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="p-10 text-2xl font-bold text-white">Your Libraries</h1>

        <div @click="goto" class="grid grid-cols-12 gap-4 bg-gray-800 text-white shadow-xl w-[50%] p-4 rounded-lg cursor-pointer transform transition duration-300 hover:scale-105">
            <div class="col-span-4">
                <img src="https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_2400,h_1600,c_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg" class="h-full" alt="">
            </div>
            <div class="col-span-8">
                <h2 class="text-lg font-bold">Beaten List </h2>
                <p class="line-clamp-2">Games that I've beaten, and I want to remember them, so I can play them again, and again, and again, and again, and again.</p>
                <div class="grid grid-cols-2 mt-4">
                    <p>Amount of games: 114</p>
                    <p>Date Created: 05/26/2023</p>
                </div>
                <div class="grid grid-cols-12 gap-2 mt-4">
                    <p class="text-green-500 mt-2 col-span-4 font-bold">Public</p>
                    <button class="col-span-4 px-4 py-2 bg-gray-700 rounded-xl hover:bg-blue-800 transition duration-300">View</button>
                    <button class="col-span-4 px-4 py-2 bg-gray-700 rounded-xl hover:bg-red-800 transition duration-300">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>