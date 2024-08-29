export const getSavedState = (key: string) =>
    JSON.parse(window.localStorage.getItem(key) as string);

export const saveState = <T>(key: string, state: T | string | null) => {
    window.localStorage.setItem(key, JSON.stringify(state));
};

export const clearApplicationState = () => {
    const localStorageKeys = Object.keys(window.localStorage);

    localStorageKeys.forEach(key => {
        window.localStorage.removeItem(key);
    });
};
