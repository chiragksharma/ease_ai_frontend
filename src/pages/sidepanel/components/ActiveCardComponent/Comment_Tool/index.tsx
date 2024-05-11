import React,{useEffect,useState} from 'react';
import OutlineDisplayCard from '@pages/sidepanel/static_components/outline_card';
import SmallTagCards from '@pages/sidepanel/static_components/small_tag_cards';
import Button from '@pages/sidepanel/static_components/button';
import InputField from '@pages/sidepanel/static_components/input_field';
import "@pages/sidepanel/components/ActiveCardComponent/Comment_Tool/index.scss"
import { useActiveCard } from '@pages/sidepanel/context/storageUpdateContext';



const VideoComment = ({ card }) => {
    const { ActiveCard, updateActiveCard } = useActiveCard();
    const [videoTitle, setVideoTitle] = useState('');
    const [channelName, setChannelName] = useState('');
    useEffect(() => {
        // Function to fetch video details from YouTube page
        const fetchVideoDetails = () => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    func: () => {
                        const titleXPath = "//div[@id='title']/h1/yt-formatted-string";
                        const channelNameXPath = "//div[@id='container']/div[@id='text-container']/yt-formatted-string[@id='text']/a";

                        const titleElement = document.evaluate(titleXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        const channelNameElement = document.evaluate(channelNameXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
                        
                        const title = titleElement ? titleElement.textContent : '';
                        const channelName = channelNameElement ? channelNameElement.textContent:'';
                        return [title, channelName];
                    }
                }, (results) => {
                    if (results && results[0]) {
                        const [title, channelName] = results[0].result;
                        console.log("This is the title of the youtube video: ",title)
                        console.log("THis is the extracted channel Name",channelName);
                        setVideoTitle(title);
                        setChannelName(channelName);
                    }
            });
        });
        };

        fetchVideoDetails();
    }, []);


    const structureJSONData = () => {
        const payload = {
            card_title: card.title,
            card_description: card.description,
            video_title: videoTitle, 
            video_description: channelName,
            prompt: {
                inputField: ActiveCard.subcomponents.inputFieldValue1,
                selectedButton: ActiveCard.subcomponents.selectedButtonValue,
            },
            transcript: "",
        };
        return payload;
    }

    const sendDataToBackground = () => {
        const data = structureJSONData();
        chrome.runtime.sendMessage({
            type: 'video_comment', // This should match the key in the handlers object in your background script
            data: data // Sending the actual data
          }); 

    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        console.log("Updated Input value: ", value);
        updateActiveCard({
            subcomponents: {
                ...ActiveCard.subcomponents,  // Preserve other subcomponent values
                inputFieldValue1: value  // Update the inputFieldValue1
            }
        });
    }; 

    const handleTagClick = (tag) => {
        // Update the ActiveCard with the selected tag
        updateActiveCard({
            subcomponents: {
                ...ActiveCard.subcomponents,
                selectedButtonValue: tag.name  // Storing tag name as selected value
            }
        });
        console.log(`Tag selected: ${tag.name}`);
    };

    const tags = [
        { name: 'Chill', icon: '🧊' },
        { name: 'Calm', icon: '🌊' },
        { name: 'Funny', icon: '🤣' },
        { name: 'Ask', icon: '❓' },
        { name: 'Appreciate', icon: '👏' }
    ];
    
    const small_tag_cards = <SmallTagCards tags={tags} onTagClick={handleTagClick} />
    const video_details = videoTitle
    const custom_instructions = <InputField placeholder='Enter Custom Instruction' value={ActiveCard.subcomponents.inputFieldValue1 || ''} onChange={handleInputChange}/>
    return (
    <div className='tones-display-card-container'>   
        <OutlineDisplayCard title="Video Description" children={video_details} />     
        <OutlineDisplayCard title="Custom Instructions" children={custom_instructions} />
        <OutlineDisplayCard title="Tone of the comment" children={small_tag_cards} />
        <Button title='Generate' onClick={sendDataToBackground} />
    </div>
);
};

export default VideoComment;