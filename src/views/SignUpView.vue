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
    import AddressInput from '@/components/inputs/Address.vue';
    import NumberInput from '@/components/inputs/Number.vue';
    import NeighborhoodInput from '@/components/inputs/Neighborhood.vue';

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

    const fetchAddressFromCep = async () => {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${zipcode.value}/json/`);
        if (response.data.erro) {
            notify({
                title: 'Invalid CEP',
                text: 'The provided CEP was not found.',
                type: 'error',
            });
            return;
        }

        address.value = response.data.logradouro || '';
        neighborhood.value = response.data.bairro || '';
        console.log('Address:', address.value);
        console.log('Neighborhood:', neighborhood.value);
        notify({
            title: 'Address updated',
            text: 'Address fields were filled automatically.',
            type: 'success',
        });
    };

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
            <AddressInput v-model="address" />
            <NumberInput v-model="number" />
            <NeighborhoodInput v-model="neighborhood" />

            <div class="col-span-12 text-center mt-6">
                <button type="submit" class=" w-full transition duration-300 bg-gray-800 rounded-xl shadow-lg w-[30%] mx-auto p-6 font-bold text-2xl font-roboto bg-gray-700 hover:bg-gray-600">
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