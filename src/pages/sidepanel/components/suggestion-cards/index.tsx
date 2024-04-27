// Suggestions.js
import React from 'react';

import SuggestionCard from '@pages/sidepanel/components/suggestion-cards/suggestion-card';
import Youtubeicon from '@assets/img/youtube-icon-colorful.svg';
import PaintRoller from '@assets/img/paint-roller.svg';
// Mock data for the suggestion cards
const suggestions = [
  { label: 'Summarize', command: '/search-agent', icon: Youtubeicon },
  { label: 'Repurpose', command: '/explain', icon: PaintRoller },
  { label: 'Post Comment', command: '/comment', icon: PaintRoller },
  { label: 'Analyze video', command: '/analyze', icon: PaintRoller },
  { label: 'Analyze channel', command: '/analyze-channel', icon: PaintRoller },
  { label: 'Reply To text', command: '/reply', icon: PaintRoller },
  // Add more suggestion objects to have a total of 8 for 4 rows with 2 cards each
];

const Suggestions = () => {
  return (
    // <SimpleGrid columns={2} spacing={11} p={4}>
    //   {suggestions.map((suggestion, index) => (
    //     <SuggestionCard key={index} {...suggestion} />
    //   ))}
    // </SimpleGrid>
    <div></div>
  );
};

export default Suggestions;
