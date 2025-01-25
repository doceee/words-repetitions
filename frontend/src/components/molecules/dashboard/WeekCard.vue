<template>
    <div
        class="relative mx-3 h-[235px] w-full justify-center rounded-md bg-gray-100 pt-4 text-center transition-opacity md:max-w-[400px]"
    >
        <v-spinner
            v-if="props.isFetching"
            class="absolute left-0 right-0 z-20 m-auto"
        />
        <div
            class="flex items-center justify-between border-b-[2px] px-5 pb-2"
            :class="{ 'opacity-10': props.isFetching }"
        >
            <h1 class="text-left text-sm">
                {{ getCurrentDate() }}
            </h1>
            <div class="flex w-fit">
                <arrow-left-icon
                    @click="onClick('subtract')"
                    class="h-[25px] rounded-full p-[5px] hover:cursor-pointer hover:bg-gray-200"
                    aria-label="Poprzedni tydzień"
                />
                <arrow-right-icon
                    @click="onClick('add')"
                    class="ml-[8px] h-[25px] rounded-full p-[5px] hover:cursor-pointer hover:bg-gray-200"
                    aria-label="Kolejny tydzień"
                />
            </div>
        </div>

        <div
            class="flex h-[150px] justify-between px-2 py-3 text-sm sm:px-5 sm:text-lg"
            :class="{ 'opacity-10': props.isFetching }"
        >
            <div
                v-for="(activity, index) in props.activities"
                :key="index"
                class="mx-1 flex flex-col justify-around rounded-xl px-1 py-2 sm:mx-1 sm:px-2"
                :class="{ 'bg-gray-200': isToday(activity) }"
            >
                <p>
                    {{ getDayname(activity) }}
                </p>
                <p>
                    {{ formatDate(activity) }}
                </p>
                <fire-icon
                    class="my-1 h-5 text-gray-300 sm:my-2"
                    :class="{ 'text-red-500': getReview(activity) }"
                />
                <cloud-icon
                    class="h-5 text-gray-300"
                    :class="{ 'text-green-500': getSignin(activity) }"
                />
            </div>
        </div>
        <div
            class="flex items-center justify-end border-t-[2px] px-4 py-[6px] text-sm"
            :class="{ 'opacity-10': props.isFetching }"
        >
            <fire-icon class="mr-1 h-4 text-red-500" /> POWTÓRKI
            <cloud-icon class="ml-3 mr-1 h-4 text-green-500" />
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
    if (!props.activities || props.activities.length === 0) return '';

    const dates = props.activities.map(item => dayjs(Object.keys(item)[0]));
    const months = [...new Set(dates.map(date => date.format('MMMM')))];
    const years = [...new Set(dates.map(date => date.year()))];

    const monthTemplate = months.join(' | ');
    const yearTemplate = years.join(' | ');

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
