<script setup>
    import { ref } from 'vue';
    import { notify } from '@kyvg/vue3-notification';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import FullnameInput from '@/components/inputs/Fullname.vue';
    import UsernameInput from '@/components/inputs/Username.vue';
    import PasswordInput from '@/components/inputs/Password.vue';
    import EmailInput from '@/components/inputs/Email.vue';
    import BirthdateInput from '@/components/inputs/Birthdate.vue';
    import ZipcodeInput from '@/components/inputs/Zipcode.vue';
    import StreetInput from '@/components/inputs/Street.vue';
    import NumberInput from '@/components/inputs/Number.vue';
    import NeighborhoodInput from '@/components/inputs/Neighborhood.vue';
    import StateInput from '@/components/inputs/State.vue';
    import CityInput from '@/components/inputs/City.vue';

    const fullname = ref('');
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const birthdate = ref('');
    const zipcode = ref('');
    const street = ref('');
    const number = ref('');
    const neighborhood = ref('');
    const state = ref('');
    const city = ref('');
    
    const router = useRouter();

    const normalizeCep = (cep) => cep.replace(/\D/g, '');

    const fetchAddressFromCep = async () => {
        const normalizedCep = normalizeCep(zipcode.value);
        if(normalizedCep.length === 8){
            const response = await axios.get(`/api-cep/ws/${normalizedCep}/json`);
    
            street.value = response.data.logradouro || '';
            neighborhood.value = response.data.bairro || '';
            state.value = response.data.uf || '';
            city.value = response.data.localidade || '';
        }
    };

    const submitForm = async () => {
        const data = {
            fullname: fullname.value,
            nickname: username.value,
            password: password.value,
            email: email.value,
            birthdate: birthdate.value,
            zipcode: zipcode.value,
            street: street.value,
            number: number.value.toString(),
            neighborhood: neighborhood.value,
            state: state.value,
            city: city.value
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users', data);
            console.log('Account created:', response.data);

            notify({
                title: 'Account created in successfully!',
                text: 'Your account has been created, you can now log in.',
                type: 'success',
            });

            router.push('/signin');
        } catch (error) {
            console.error('Error creating account:', error);

            notify({
                title: 'Error creating account',
                text: error.response?.data?.message || 'An unexpected error occurred. Try again later.',
                type: 'error',
            });
        }
    };

</script>

<template>
    <main class="text-center container mx-auto text-white">
        <div class="bg-gray-800 rounded-xl shadow-lg mt-10 w-[40%] mx-auto">
            <div class="p-6 font-bold text-2xl font-roboto">
                Create your own account now!
            </div>
        </div>
        <form @submit.prevent="submitForm" class="bg-gray-800 grid grid-cols-12 gap-4 items-center rounded-xl shadow-lg mt-10 w-[40%] mx-auto p-6">
            <FullnameInput v-model="fullname" />
            <UsernameInput v-model="username" />
            <PasswordInput v-model="password" />
            <EmailInput v-model="email" />
            <BirthdateInput v-model="birthdate" />
            <ZipcodeInput v-model="zipcode" @input="fetchAddressFromCep"/>
            <StreetInput v-model="street" />
            <CityInput v-model="city" />
            <NumberInput v-model="number" />
            <NeighborhoodInput v-model="neighborhood" />
            <StateInput v-model="state" />

            <div class="col-span-12 text-center mt-6">
                <button type="submit" class=" w-full transition duration-300 bg-gray-700 rounded-xl shadow-lg w-[30%] mx-auto p-6 font-bold text-2xl font-roboto bg-gray-700 hover:bg-gray-600">
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