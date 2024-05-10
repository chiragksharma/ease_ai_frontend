// Define interface for a single card
interface CardDetails {
    id: string;
    name: string;
    details: Record<string, any>; // Use a generic object for details
}

// Define interface for the storage structure
interface StorageData {
    cards: Record<string, CardDetails>; // Using a dictionary for quick lookups
}