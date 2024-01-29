<template>
    <q-page padding class="row items-center justify-center">
        <!-- <template>
            <img src="~/assets/images/img-1.jpg" />
        </template> -->
        <!-- <q-img :src="imgUrl" spinner-color="white" style="height: 200px; max-width: 200px" /> -->

        <!-- <img src="~/assets/images/img-1.jpg" height="200"> -->
        <template>
            <div>
                <Bar :data="chartData" :options="chartOptions" />
            </div>
        </template>
        <!-- <img src="https://centralinaaging.org/wp-content/uploads/2021/03/Your-Logo-here.png" height="200"> -->
        <div class="row full-width">
            <div class="col-md-4 offset-md-4 col-xs-12 q-pl-md q-pr-md">
                <q-card>
                    <div class="row">
                        <div class="col-md-12 col-xs-12">
                            <div class="q-pa-md">
                                <div class="text-h6 q-pb-md text-center text-weight-bolder">
                                    กรุณาล็อคอินเพื่อเข้าใช้งานระบบ
                                </div>
                                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                                    <q-input color="primary" outlined v-model="username" label="Username" lazy-rules :rules="[
                                        (val) =>
                                            (val && val.length > 0) || 'Please type Username',
                                    ]" />

                                    <q-input color="primary" outlined type="password" v-model="password" label="Password"
                                        lazy-rules :rules="[
                                            (val) =>
                                                (val && val.length > 0) || 'Please type Password',
                                        ]" />

                                    <div class="row space-between">
                                        <q-btn label="เข้าสู่ระบบ" type="submit" color="primary" />
                                        <q-btn label="ล้างข้อมูล" type="reset" color="primary" flat class="q-ml-sm" />
                                    </div>
                                </q-form>
                            </div>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
  
<script setup>
import moment from 'moment';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'

// Register
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const chartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 50, 10],
        },
    ],
})
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
})




// const img_1 = import(`../assets/images/img-1.jpg`);
const imgUrl = new URL('../assets/images/img-1.jpg', import.meta.url).href
{/* <template>
            <img :src="require(`../assets/images/img-1.jpg`)" alt="My Image" />
        </template> */}
// const plans = [
//     {
//         imageSrc: new URL('../assets/images/img-1.png', import.meta.url).href,

//     },

// ];
const username = ref(null)
const password = ref(null)

async function onSubmit() {
    const router = useRouter()
    const config = useRuntimeConfig();
    // let url = config.public.baseURL + '/auth/login'
    // let result = await useFetch(url, {
    //     method: 'post',
    //     body: {
    //         username: username,
    //         password: password
    //     }
    // })

    // console.log(result)
    // if (result.status = "success") {
    //     let currentUrl = new URL(window.location)
    //     setStorage(result.data.value)
    //     location.replace(currentUrl.origin)
    // }
    // console.log(username)
    // console.log(password)
    if (username.value === 'admin' && password.value === 'admin123') {

        let currentUrl = new URL(window.location)

        setStorage({ username: username.value })
        // location.replace(currentUrl.origin)
        router.push("/")

        // console.log("click submit");
    }
}
function setStorage(value) {

    let userProfile = JSON.stringify(value)
    console.log(userProfile)
    localStorage.setItem('UserProfile', userProfile)

    // let userProfileJson = JSON.parse(localStorage.getItem('UserProfile'))
    // console.log(userProfileJson)
}
function onReset() {
    username.value = null;
    password.value = null;
}
// export default {
//     data() {
//         return {
//             username: null,
//             password: null,
//         };
//     },

//     methods: {
//         onSubmit() {
//             console.log("click submit");
//         },
//         onReset() {
//             this.username = null;
//             this.password = null;
//         },
//     },
// };
</script>