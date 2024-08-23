<template>
    <the-container>
        <div class="flex">
            <profile-card :email="authStore.loggedUser?.email" />
            <week-card
                :activities="activityList"
                :is-fetching="isFetchingActivities"
                @change="fetchActivities($event)"
            />
        </div>
    </the-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useUserActivitiesStore } from '@/store/modules/user-activities';
import TheContainer from '@/components/molecules/TheContainer.vue';
import ProfileCard from '@/components/molecules/dashboard/ProfileCard.vue';
import WeekCard from '@/components/molecules/dashboard/WeekCard.vue';
import { type IWeeklyActivity } from '@/types/user-activity';

const authStore = useAuthStore();
const userActivitiesStore = useUserActivitiesStore();

let activityList = ref<IWeeklyActivity[]>();
const isFetchingActivities = ref(false);

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
