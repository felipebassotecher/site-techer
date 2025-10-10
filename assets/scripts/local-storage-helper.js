const baseKey = 'techer';

export const LOCAL_STORAGE_KEYS = {
    FaleConosco: {
        ShowSuccessMessage: `${baseKey}.fale-conosco.success-message.show`
    }
};

export const LocalStorageHelper = {
    get: (key) => {
        const item = localStorage.getItem(key);
        try {
            return JSON.parse(item);
        } catch (e) {
            return item;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};
