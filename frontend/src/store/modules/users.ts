import axios from 'axios';
import { defineStore } from 'pinia';
import type { ILoggedUser } from '@/types/auth';

export const useUsersStore = defineStore('users', {
    actions: {
        async updateStat(prop: keyof ILoggedUser, value: number) {
            try {
                await axios.put('/users/stats', {
                    prop,
                    value
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
});
