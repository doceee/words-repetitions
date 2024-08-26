<template>
    <div
        class="relative mx-[12px] h-[235px] w-full justify-center rounded-md bg-gray-100 pt-[14px] text-center transition-opacity md:max-w-[400px]"
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
            class="flex h-[150px] justify-between px-[22px] py-[12px] text-sm sm:text-lg"
            :class="{ 'opacity-10': props.isFetching }"
        >
            <div
                v-for="(activity, index) in props.activities"
                :key="index"
                class="mx-[2px] flex flex-col justify-around rounded-xl px-[2px] py-[8px] sm:mx-[5px] sm:px-[8px]"
                :class="{ 'bg-gray-200': isToday(activity) }"
            >
                <p>
                    {{ getDayname(activity) }}
                </p>
                <p>
                    {{ formatDate(activity) }}
                </p>
                <fire-icon
                    class="my-[2px] h-[22px] text-gray-300 sm:my-[5px]"
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

const getCurrentDate = () => {
    if (!props.activities) return;

    let months: string[] = [];
    let years: number[] = [];

    props.activities.map(item => {
        let date = Object.keys(item)[0];
        let month = dayjs(date).format('MMMM');
        let year = dayjs(date).year();

        if (!months.includes(month)) months.push(month);
        if (!years.includes(year)) years.push(year);
    });

    let monthTemplate =
        months.length > 1 ? `${months[0]} | ${months[1]}` : `${months[0]}`;
    let yearTemplate =
        years.length > 1 ? `${years[0]} | ${years[1]}` : `${years[0]}`;

    return `${monthTemplate}  ${yearTemplate}`.toLocaleUpperCase();
};

const isToday = (obj: IWeeklyActivity) => dayjs(Object.keys(obj)[0]).isToday();

const formatDate = (obj: IWeeklyActivity) =>
    dayjs(Object.keys(obj)[0]).format('DD');

const getSignin = (obj: IWeeklyActivity) => obj[Object.keys(obj)[0]].signin;

const getReview = (obj: IWeeklyActivity) => obj[Object.keys(obj)[0]].review;

const getDayname = (obj: IWeeklyActivity) =>
    dayjs(Object.keys(obj)[0]).format('dd').toLocaleUpperCase();
</script>
