<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { notify } from '@kyvg/vue3-notification';
    import Fullname from '@/components/inputs/Fullname.vue';
    import Username from '@/components/inputs/Username.vue';
    import Password from '@/components/inputs/Password.vue';
    import Email from '@/components/inputs/Email.vue';
    import Birthdate from '@/components/inputs/Birthdate.vue';

    const id = ref('');
    const fullname = ref('');
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const birthdate = ref('');

    onMounted(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            id.value = response.data.id;
            fullname.value = response.data.fullname;
            username.value = response.data.nickname;
            password.value = response.data.password;
            email.value = response.data.email;
            birthdate.value = response.data.birthdate;

        } catch (error) {
            console.error(error);
        }
    });


    const updateProfile = async () => {

        const data = {
            fullname: fullname.value,
            nickname: username.value,
            password: password.value,
            email: email.value,
            birthdate: birthdate.value
        };

        console.log(id.value);

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/users/${id.value}`, data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            notify({
                title: 'Profile updated successfully',
                type: 'success'
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

</script>

<template>
    <h1 class="p-6 text-2xl font-bold text-white text-center">Edit your profile data</h1>
    <div class="flex justify-center text-center text-white grid grid-cols-12">
        <div class="p-6 bg-gray-800 rounded-xl shadow-lg w-[500px] mx-auto col-span-12">
            <form @submit.prevent="updateProfile" class="bg-gray-800 grid grid-cols-12 gap-4 rounded-xl mx-auto ">
                <Fullname v-model="fullname" col-span="12"/>
                <Username v-model="username" col-span="12"/>
                <!-- <Password v-model="password"/> -->
                <Email v-model="email"/>
                <Birthdate v-model="birthdate" label="Birthdate"/>
                <button type="submit" class="col-span-12 bg-gray-700 rounded-xl hover:bg-gray-600 transition duration-300 text-white mt-8 py-2 px-6">
                    Update Profile
                </button>
            </form>
        </div>
    </div>
</template>