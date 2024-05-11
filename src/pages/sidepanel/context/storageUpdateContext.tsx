import React, { createContext, useContext, useState } from 'react';
// Define the type for the context value
type ActiveCardContextType = {
    ActiveCard: {
        title: string;
        description: string;
        subcomponents: {
            inputFieldValue1?: string;  // Optional field for the input value
            selectedButtonValue?: string;  // Optional field for the selected button value
        };
    };
    updateActiveCard: (updates: Partial<{
         title: string; 
         description: string 
         subcomponents: {
            inputFieldValue1?: string;  // Optional field for the input value
            selectedButtonValue?: string;  // Optional field for the selected button value
        };
        }>) => void;
};
// Provide a default context value matching the expected structure
const defaultContextValue: ActiveCardContextType = {
    ActiveCard: {
        title: '',
        description: '',
        subcomponents: {
            inputFieldValue1: '',  
            selectedButtonValue: '', 
        },
    },
    updateActiveCard: () => {} 
};


const ActiveCardContext = createContext<ActiveCardContextType>(defaultContextValue);


// Step 2: Create the provider component
export const ActiveCardProvider = ({ children,activeCard }) => {
    
    const [ActiveCard, setActiveCard] = useState({
        title: activeCard.name,
        description: activeCard.description,
        subcomponents: {
            inputFieldValue1: '',  
            selectedButtonValue: '', 
        },
    });
    console.log("This is the active card name: ",ActiveCard)
    // Function to update the active card details
    const updateActiveCard = (updates) => {
        setActiveCard((prev) => ({ ...prev, ...updates }));
        console.log("These are the updates: ",updates);
    };

    return (
        <ActiveCardContext.Provider value={{ ActiveCard, updateActiveCard }}>
            {children}
        </ActiveCardContext.Provider>
    );
};

// Step 3: Create a custom hook to use the active card context
export const useActiveCard = () => {
    const context = useContext(ActiveCardContext);
    if (!context) {
        throw new Error('useActiveCard must be used within an ActiveCardProvider');
    }
    return context;
};
