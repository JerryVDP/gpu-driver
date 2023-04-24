<template>
    <Container class="w-11/12 max-w-4xl">
        <h2 class="text-center text-2xl mb-4">Subscribe to GPU drivers updates</h2>
        <div v-if="isSubscribed">
            <div class="ring-1 p-2 rounded-md ring-slate-500">
                <template v-for="(gpuBrand, id) in gpuBrands">
                    <BrandToggleRow :name="gpuBrand.name" :id="id" :value="gpuBrand.enabled" @change="onToggleChange" />
                </template>
            </div>
        </div>
        <div class="text-center" v-else>
            <button @click="requestPermission" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Start by allowing browser notifications
            </button>
        </div>
    </Container>
</template>

<script>
import Container from './components/Container.vue'
import BrandToggleRow from './components/BrandToggleRow.vue';
import api from '../helpers/api';

export default {
    components: {
        Container,
        BrandToggleRow
    },
    data() {
        return {
            count: 0,
            notificationsToken: null,
            amd_enabled: true,
            nvidia_enabled: true,
            gpuBrands: {
                nvidia: {
                    name: 'NVIDIA',
                    enabled: true
                },
                amd: {
                    name: 'AMD',
                    enabled: true
                }
            }
        }
    },
    methods: {
        requestPermission() {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    this.updateToken();
                }
            });
        },
        urlBase64ToUint8Array(base64String) {
            const padding = "=".repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, "+")
                .replace(/_/g, "/");

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        },
        async updateToken() {
            //register service worker
            const register = await navigator.serviceWorker.register('/worker.js', {
                scope: '/'
            });

            await navigator.serviceWorker.ready;

            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,

                //public vapid key
                applicationServerKey: this.urlBase64ToUint8Array('BN4FSF0DdWQUdKXrNFb1SAbYfUmt5acUvbmVs4DctpILuj22cWsR_Er8Yr3K_W-D60lYUTvvMsiM2mxZUpfiDsk')
            });

            if (subscription) {
                console.log('Current token:', subscription);
                console.log(this.gpuBrands.amd);
                this.notificationsToken = subscription;
                api.post('/api/notifications/subscribe', { token: JSON.stringify(subscription) }).then((response) => {
                    this.nvidia_enabled = response.data.vendors.nvidia;
                    this.amd_enabled = response.data.vendors.amd;
                    this.gpuBrands.amd.enabled = this.amd_enabled;
                    this.gpuBrands.nvidia.enabled = this.nvidia_enabled;
                });
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');
                this.requestPermission();
            }
        },
        onToggleChange(vendor, val) {
            const key = vendor + '_enabled';
            this.gpuBrands[vendor].enabled = val
            const payload = {
                token: this.notificationsToken,
                amd: this.gpuBrands.amd.enabled,
                nvidia: this.gpuBrands.nvidia.enabled
            }
            api.post('/api/notifications/update', payload);
        }
    },
    computed: {
        isSubscribed() {
            return this.notificationsToken != null;
        },
        isBrowserSupported() {

        }
    },
    mounted() {
        if (Notification.permission === 'granted') {
            this.updateToken();
        }
    }
}
</script>