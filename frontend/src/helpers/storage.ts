export const getSavedState = (key: string) => {
    return JSON.parse(window.localStorage.getItem(key) as string);
};

export function saveState<T>(key: string, state: T | string | null) {
    window.localStorage.setItem(`${key}`, JSON.stringify(state));
}

export const clearApplicationState = () => {
    const localStorageKeys = Object.keys(window.localStorage);

    localStorageKeys.forEach(key => {
        window.localStorage.removeItem(key);
    });
};
