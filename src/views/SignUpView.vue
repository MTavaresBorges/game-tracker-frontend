<script setup>
    import { ref } from 'vue';
    import { notify } from '@kyvg/vue3-notification';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import FullnameInput from '@/components/inputs/signup/Fullname.vue';
    import UsernameInput from '@/components/inputs/signup/Username.vue';
    import PasswordInput from '@/components/inputs/signup/Password.vue';
    import EmailInput from '@/components/inputs/signup/Email.vue';
    import BirthdateInput from '@/components/inputs/signup/Birthdate.vue';
    import ZipcodeInput from '@/components/inputs/signup/Zipcode.vue';
    import AddressInput from '@/components/inputs/signup/Address.vue';
    import NumberInput from '@/components/inputs/signup/Number.vue';
    import NeighborhoodInput from '@/components/inputs/signup/Neighborhood.vue';

    const fullname = ref('');
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const birthdate = ref('');
    const zipcode = ref('');
    const address = ref('');
    const number = ref('');
    const neighborhood = ref('');
    
    const router = useRouter();

    const submitForm = async () => {
        const data = {
            fullname: fullname.value,
            nickname: username.value,
            password: password.value,
            email: email.value,
            birthdate: birthdate.value,
            zipcode: zipcode.value,
            address: address.value,
            number: number.value,
            neighborhood: neighborhood.value
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users', data);
            console.log('Account created:', response.data);

            notify({
                title: 'Conta criada com sucesso!',
                text: 'Sua conta foi criada. Faça login usando seus dados.',
                type: 'success',
            });

            router.push('/signin');
        } catch (error) {
            console.error('Error creating account:', error);

            notify({
                title: 'Erro ao criar conta!',
                text: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
                type: 'error',
            });
        }
    };
</script>

<template>
    <main class="text-center container mx-auto text-white">
        <div class="bg-blue-900 rounded-xl shadow-lg mt-10 w-[40%] mx-auto">
            <div class="p-6 font-bold text-2xl font-roboto">
                Create your own account now!
            </div>
        </div>
        <form @submit.prevent="submitForm" class="bg-blue-900 grid grid-cols-12 gap-4 items-center rounded-xl shadow-lg mt-10 w-[40%] mx-auto p-6">
            <FullnameInput v-model="fullname" />
            <UsernameInput v-model="username" />
            <PasswordInput v-model="password" />
            <EmailInput v-model="email" />
            <BirthdateInput v-model="birthdate" />
            <ZipcodeInput v-model="zipcode" />
            <AddressInput v-model="address" />
            <NumberInput v-model="number" />
            <NeighborhoodInput v-model="neighborhood" />

            <div class="col-span-12 text-center mt-6">
                <button type="submit" class="bg-blue-900 rounded-xl shadow-lg w-[30%] mx-auto p-6 font-bold text-2xl font-roboto bg-blue-600 hover:bg-blue-700">
                    Sign Up
                </button>
            </div>
        </form>
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