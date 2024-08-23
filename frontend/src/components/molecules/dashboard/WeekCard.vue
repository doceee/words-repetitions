<template>
    <div
        class="relative mx-[12px] w-full max-w-[400px] justify-center rounded-md bg-gray-100 pt-[14px] text-center transition-opacity"
    >
        <v-spinner
            v-if="props.isFetching"
            class="absolute left-0 right-0 z-20 m-auto"
        />
        <div
            class="flex items-center justify-between border-b-[2px] px-[18px] pb-[10px]"
            :class="{ 'opacity-10': props.isFetching }"
        >
            <h1 class="text-left text-sm">
                {{ getCurrentDate() }}
            </h1>
            <div class="flex w-fit">
                <arrow-left-icon
                    @click="onClick('subtract')"
                    class="h-[25px] rounded-full p-[5px] hover:cursor-pointer hover:bg-gray-500"
                />
                <arrow-right-icon
                    @click="onClick('add')"
                    class="ml-[8px] h-[25px] rounded-full p-[5px] hover:cursor-pointer hover:bg-gray-400"
                />
            </div>
        </div>

        <div
            class="flex px-[22px] py-[12px] text-lg"
            :class="{ 'opacity-10': props.isFetching }"
        >
            <div
                v-for="(activity, index) in activities"
                :key="index"
                class="mx-[5px] flex flex-col rounded-xl px-[8px] py-[8px]"
                :class="{ 'bg-gray-200': isToday(activity) }"
            >
                <p>
                    {{ getDayname(activity) }}
                </p>
                <p>
                    {{ formatDate(activity) }}
                </p>
                <fire-icon
                    class="my-[5px] h-[22px] text-gray-300"
                    :class="{ 'text-red-500': getReview(activity) }"
                />
                <cloud-icon
                    class="h-[22px] text-gray-300"
                    :class="{ 'text-green-500': getSignin(activity) }"
                />
            </div>
        </div>
        <div
            class="flex items-center justify-end border-t-[2px] px-[18px] py-[6px] text-sm"
            :class="{ 'opacity-10': props.isFetching }"
        >
            <fire-icon class="mr-[4px] h-[18px] text-red-500" /> POWTÓRKI
            <cloud-icon class="ml-[12px] mr-[4px] h-[18px] text-green-500" />
            LOGOWANIE
        </div>
    </div>
</template>

<script setup lang="ts">
import { dayjs } from '@/helpers/dates';
import { FireIcon, CloudIcon } from '@heroicons/vue/20/solid';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';
import { type IWeeklyActivity } from '@/types/user-activity';
import VSpinner from '@/components/atoms/VSpinner.vue';
import { toRef } from 'vue';

const emit = defineEmits(['change']);
const onClick = (op: 'subtract' | 'add') => {
    if (!props.activities) {
        emit('change');
        return;
    }

    emit('change', dayjs(Object.keys(props.activities[0])[0])[op](7, 'd'));
};

const props = defineProps<{
    activities?: IWeeklyActivity[];
    isFetching: boolean;
}>();
const activities = toRef(() => props.activities);

const getCurrentDate = () => {
    if (!activities.value) return;

    let months: string[] = [];
    const year = dayjs(Object.keys(activities.value[0])[0]).year();

    activities.value.map(item => {
        let date = dayjs(Object.keys(item)[0])
            .format('MMMM')
            .toLocaleUpperCase();

        if (!months.includes(date)) months.push(date);
    });

    if (months.length > 1) {
        return `${months[0]} | ${months[1]}  ${year}`;
    }

    return `${months[0]}  ${year}`;
};

const isToday = (obj: IWeeklyActivity) => dayjs(Object.keys(obj)[0]).isToday();

const formatDate = (obj: IWeeklyActivity) =>
    dayjs(Object.keys(obj)[0]).format('DD');

const getSignin = (obj: IWeeklyActivity) => obj[Object.keys(obj)[0]].signin;

const getReview = (obj: IWeeklyActivity) => obj[Object.keys(obj)[0]].review;

const getDayname = (obj: IWeeklyActivity) =>
    dayjs(Object.keys(obj)[0]).format('dd').toLocaleUpperCase();
</script>
