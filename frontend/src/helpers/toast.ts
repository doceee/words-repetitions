import { useToast } from 'vue-toastification';

const toastObj = useToast();

export const toast = (
    content: string,
    type: 'success' | 'info' | 'error' = 'success'
) => {
    toastObj[type](content);
};
