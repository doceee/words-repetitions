<template>
    <the-container>
        <div class="grid grid-flow-row-dense grid-cols-2 gap-2 md:flex">
            <profile-card
                class="justify-self-center"
                :email="loggedUser?.email"
            />
            <week-card
                class="order-first col-span-2 justify-self-center md:order-none"
                :activities="activityList"
                :is-fetching="isFetchingActivities"
                @change="fetchActivities($event)"
            />
            <user-stats-card
                class="justify-self-center"
                :reviewed-words="loggedUser?.reviewedWords"
                :consecutive-activity="loggedUser?.consecutiveActivity"
                :reviews-done="loggedUser?.reviewsDone"
            />
        </div>
    </the-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useUserActivitiesStore } from '@/store/modules/user-activities';
import TheContainer from '@/components/molecules/TheContainer.vue';
import ProfileCard from '@/components/molecules/dashboard/ProfileCard.vue';
import WeekCard from '@/components/molecules/dashboard/WeekCard.vue';
import UserStatsCard from '@/components/molecules/dashboard/UserStatsCard.vue';

import { type IWeeklyActivity } from '@/types/user-activity';

const { loggedUser } = storeToRefs(useAuthStore());
const userActivitiesStore = useUserActivitiesStore();
const isFetchingActivities = ref(false);
let activityList = ref<IWeeklyActivity[]>();

const fetchActivities = async (date: string) => {
    isFetchingActivities.value = true;
    try {
        activityList.value = await userActivitiesStore.getActivities(date);
    } catch (error) {
        console.error(error);
    } finally {
        isFetchingActivities.value = false;
    }
};

onMounted(() => {
    fetchActivities(dayjs().format());
});
</script>
