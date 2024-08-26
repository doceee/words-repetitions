import axios from 'axios';
import { defineStore } from 'pinia';
import type { IWeeklyActivity, ActivityType } from '@/types/user-activity';
import dayjs from 'dayjs';

export const useUserActivitiesStore = defineStore('userActivities', {
    actions: {
        getActivities(date: string): Promise<IWeeklyActivity[]> {
            return axios.get(`/user-activities/weekly-activities`, {
                params: { date: dayjs(date).format('YYYY-MM-DD') }
            });
        },

        async storeActivity(activity: ActivityType) {
            try {
                await axios.post(`/user-activities`, {
                    activity
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
});
