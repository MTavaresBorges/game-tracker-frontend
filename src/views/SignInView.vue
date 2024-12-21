<script setup>
    import { ref } from 'vue';
    import { notify } from '@kyvg/vue3-notification';
    import { useRouter } from 'vue-router';
    import { setAuthenticated } from '../utils/auth';
    import axios from 'axios';
    import EmailInput from '@/components/inputs/signup/Email.vue';
    import PasswordInput from '@/components/inputs/signup/Password.vue';


    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const submitForm = async () => {
        const data = {
            email: email.value,
            password: password.value
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setAuthenticated(true);

            notify({
                title: 'Login realizado com sucesso!',
                text: 'Bem vindo!!!',
                type: 'success',
            });
            
            router.push('/home');
        } catch (error) {
            notify({
                title: 'Login falhou',
                text: 'Verifique seus dados.',
                type: 'error',
            });
        }
    };

</script>

<template>
    <main class="text-center container mx-auto text-white">
        <div class="bg-blue-900 rounded-xl shadow-lg mt-10 w-[40%] mx-auto">
            <div class="p-6 font-bold text-2xl font-roboto">
                Welcome!
            </div>
        </div>
        <div class="bg-blue-900 gap-4 items-center rounded-xl shadow-lg mt-10 w-[40%] mx-auto p-6">
            <form @submit.prevent="submitForm">
                <EmailInput v-model="email" />
                <br>
                <PasswordInput v-model="password" />
                <div class="col-span-12 text-center mt-6">
                    <button type="submit" class="bg-blue-900 rounded-xl shadow-lg w-[30%] mx-auto p-6 font-bold text-2xl font-roboto bg-blue-600 hover:bg-blue-700">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </main>
</template>

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