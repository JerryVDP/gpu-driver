<template>
    <div class="flex flex-row border-b last:border-b-0 border-slate-600 pb-2 mb-2 last:mb-0 last:pb-0">
        <div class="flex flex-grow flex-col">
            <div class="text-slate-900 dark:text-white text-lg font-bold">
                {{ this.name }}
            </div>
            <div class="text-slate-600 dark:text-slate-500">
                Enable notifications for new {{ this.name }} drivers
            </div>
        </div>
        <div class="flex flex-col justify-center">
            <div>
                <Switch v-model="valueModel" :class="valueModel ? 'bg-blue-600' : 'bg-gray-600'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full">
                    <span class="sr-only">Enable notifications</span>
                    <span :class="valueModel ? 'translate-x-6' : 'translate-x-1'"
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </Switch>
            </div>
        </div>
    </div>
</template>

<script>
import { Switch } from '@headlessui/vue'

export default {
    components: {
        Switch
    },
    props: {
        name: {
            required: true
        },
        image: {
            required: false
        },
        value: {
            required: true
        },
        id: {
            required: true
        }
    },
    computed: {
        valueModel: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('change', this.id, value);
            }
        }
    }
}
</script>