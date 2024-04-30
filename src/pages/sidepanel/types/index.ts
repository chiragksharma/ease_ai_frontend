
// The  structure of an input field for the card
export interface InputField {
    type: string;
    placeholder?: string;
    // ... any other properties for InputField
  }
  
  export interface Action {
    name: string;
    endpoint: string;
  }
  
  export interface Card {
    // id?: string; // Add this line to your Card interface
    name: string;
    icon: string;
    description: string;
    inputFields: InputField[];
    tags: string[];
    category: string;
    actions?: Action[]; // Ensure actions are defined if used in your cards
    // ... any other properties for Card
  }

  export interface CardJson {
    id: string;
    icon: string;
    name: string;
    description: string;
    tags: string[];
    category: string;
    inputFields: InputField[];
    actions: Action[];
    
} 

  // You can also define types for operations, categories, tags, etc., if needed.
  // For example:
//   export type CardCategory = 'Analysis' | 'Monetization' | 'Engagement' | 'SEO';
  
  