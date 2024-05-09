import React, { createContext, useState, useContext } from 'react';

// Define the context with a default undefined value for TypeScript compatibility
const CardContext = createContext(undefined);

// Define a provider for the card context
export const CardProvider = ({ children }) => {
    const [activeCard, setActiveCard] = useState(null);

    // Function to activate a card
    const activateCard = (card) => {
        setActiveCard(card);
    };

    // Function to deactivate the active card
    const deactivateCard = () => {
        setActiveCard(null);
    };

    return (
        <CardContext.Provider value={{ activeCard, activateCard, deactivateCard }}>
            {children}
        </CardContext.Provider>
    );
};

// Custom hook to use the card context
export const useCardContext = () => {
    const context = useContext(CardContext);
    if (context === undefined) {
        throw new Error('useCardContext must be used within a CardProvider');
    }
    return context;
};
