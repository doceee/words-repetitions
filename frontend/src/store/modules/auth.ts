import axios from 'axios';
import { defineStore } from 'pinia';
import {
    saveState,
    getSavedState,
    clearApplicationState
} from '@/helpers/storage';
import type {
    ILoginData,
    IAuthState,
    ILoggedUser,
    IRegisterData
} from '@/types/auth';

export const useAuthStore = defineStore('auth', {
    state: (): IAuthState => {
        const loggedUser = getSavedState('user') || null;

        return {
            loggedUser
        };
    },

    getters: {
        isLoggedIn: state => !!state.loggedUser,

        user(): ILoggedUser | null {
            if (!this.loggedUser) {
                return null;
            }

            return this.loggedUser;
        }
    },

    actions: {
        async login(userData: ILoginData) {
            if (this.isLoggedIn) {
                await this.validate();

                return;
            }

            const user: ILoggedUser = await axios.post('/auth/login', userData);

            this.setUser(user);
        },

        async register(registerData: IRegisterData) {
            const user: ILoggedUser = await axios.post(
                '/auth/register',
                registerData
            );

            this.setUser(user);
        },

        async logout() {
            await axios.post('/auth/logout');

            this.setUser(null);
        },

        async validate() {
            if (!this.loggedUser?.id) {
                return;
            }

            try {
                const user: ILoggedUser = await axios.get('/auth/me');

                this.setUser(user);
            } catch (error) {
                console.error(error);

                this.setUser(null);
            }
        },

        setUser(user: ILoggedUser | null) {
            this.loggedUser = user;

            if (user) {
                saveState('user', user);

                return;
            }

            clearApplicationState();
        }
    }
});
