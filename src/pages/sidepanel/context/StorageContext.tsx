import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocalStorageProviderProps {
    children: ReactNode;  
}

// Create a context
const LocalStorageContext = createContext<[StorageData, (data: StorageData) => void] | undefined>(undefined);

// Context provider
const LocalStorageProvider: React.FC<LocalStorageProviderProps> = ({ children }) => {
    const [storageData, setStorageData] = useState<StorageData>({ cards: {} });

    // Sync with local storage
    const syncLocalStorage = (data: StorageData) => {
        setStorageData(data);
        chrome.storage.local.set({ 'storageData': data });
    };

    return (
        <LocalStorageContext.Provider value={[storageData, syncLocalStorage]}>
            {children}
        </LocalStorageContext.Provider>
    );
};

export { LocalStorageProvider, LocalStorageContext };

// Custom hook to use storage data
export function useLocalStorage() {
    const context = useContext(LocalStorageContext);
    if (!context) {
        throw new Error("useLocalStorage must be used within a LocalStorageProvider");
    }
    return context;
}
