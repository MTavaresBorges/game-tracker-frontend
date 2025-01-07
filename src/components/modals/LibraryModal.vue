<script setup>
    const emit = defineEmits(['close-modal']);
    const props = defineProps({
        modalActive: {
            type: Boolean,
            default: false,
        },
    });
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive" class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex items-center justify-center px-8">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class="flex grid grid-cols-12 p-4 bg-gray-700 rounded-xl shadow-2xl text-white self-start self-start mt-[400px] w-[500px]">
                        <h2 class="text-lg font-bold mb-4 col-span-12">Create your new library!</h2>
                        <slot />
                        <button class="ml-1 col-span-6 bg-gray-800 rounded-xl hover:bg-gray-600 transition duration-300 text-white mt-8 py-2 px-6" @click="$emit('close-modal')">Close</button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
    /* Classes used to animate the modal when closing and opening */

    .modal-outer-enter-active,
    .modal-outer-leave-active {
        transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }
    .modal-outer-enter-from,
    .modal-outer-leave-to {
        opacity: 0;
    }

    .modal-inner-enter-active {
        transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
    }

    .modal-inner-leave-active {
        transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }

    .modal-inner-enter-from {
        opacity: 0;
        transform: scale(0.8);
    }

    .modal-inner-leave-to {
        transform: scale(0.8);
    }
</style>