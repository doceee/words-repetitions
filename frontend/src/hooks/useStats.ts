import { useUsersStore } from '@/store/modules/users';
import { useAuthStore } from '@/store/modules/auth';
import type { ILoggedUser } from '@/types/auth';

export const useStats = () => {
    const usersStore = useUsersStore();
    const authStore = useAuthStore();

    const updateStat = async (prop: keyof ILoggedUser, value: number) => {
        await usersStore.updateStat(prop, value);

        if (authStore.loggedUser) {
            switch (prop) {
                case 'reviewedWords':
                    authStore.loggedUser.reviewedWords += value;
                    break;
                case 'reviewsDone':
                    authStore.loggedUser.reviewsDone += value;
                    break;
                default:
                    throw Error('Invalid key!');
            }
        }
    };

    return { updateStat };
};
