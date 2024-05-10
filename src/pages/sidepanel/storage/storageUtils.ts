// storageUtils.ts

// Function to get all data from storage
export const getStorageData = async (): Promise<any> => {
    return new Promise((resolve) => {
        chrome.storage.local.get(['storageData'], (result) => {
            resolve(result.storageData || {});
        });
    });
};

// Function to handle local data changes (add or update)
export const handleLocalDataChange = async (key: string, newValue: any): Promise<void> => {
    const data = await getStorageData();
    data[key] = newValue;  // Set new or update existing value
    chrome.storage.local.set({ 'storageData': data });
};

// Function to delete data from local storage
export const deleteFromStorage = async (key: string): Promise<void> => {
    const data = await getStorageData();
    delete data[key];  // Remove the property
    chrome.storage.local.set({ 'storageData': data });
};

// Function to clear all data from storage
export const clearStorage = async (): Promise<void> => {
    chrome.storage.local.clear();
};
