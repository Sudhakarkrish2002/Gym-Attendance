const isBrowser = typeof window !== 'undefined';

const getStorage = () => {
  if (!isBrowser) return null;
  try {
    return window.localStorage;
  } catch (error) {
    console.error('Unable to access localStorage:', error);
    return null;
  }
};

const storage = getStorage();

export const getItem = async (key, fallback = null) => {
  if (!storage) return fallback;

  try {
    const rawValue = storage.getItem(key);
    if (rawValue === null) return fallback;
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Failed to read storage key "${key}"`, error);
    return fallback;
  }
};

export const setItem = async (key, value) => {
  if (!storage) return;

  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to persist storage key "${key}"`, error);
  }
};
