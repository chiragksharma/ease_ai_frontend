import React,{useEffect,useState,useRef} from 'react';
import OutlineDisplayCard from '@pages/sidepanel/static_components/outline_card';
import SmallTagCards from '@pages/sidepanel/static_components/small_tag_cards';
import Button from '@pages/sidepanel/static_components/button';
import InputField from '@pages/sidepanel/static_components/input_field';
import "@pages/sidepanel/components/ActiveCardComponent/Comment_Tool/index.scss"
import { useActiveCard } from '@pages/sidepanel/context/storageUpdateContext';

const DescriptionComponent = ({title,channel_name})=> {
    return (
        <div className='video-details-container'>
            <div className='video-title-container'>
                <span className='tag-title'>Title: </span>
                <span className='tag-content'>{title}</span>
            </div>
            <div className='channel-name-container'>
                <span className='tag-title'>Channel: </span>
                <span className='tag-content'>{channel_name}</span>            </div>
        </div>
    )
}

const VideoComment = ({ card }) => {
    const { ActiveCard, updateActiveCard } = useActiveCard();
    const [videoTitle, setVideoTitle] = useState('');
    const [channelName, setChannelName] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const handleGenerateClick = () => {
        setIsLoading(true);
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("This is inside the tabs query");
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "moveAndType",
                selector: "ytd-comment-simplebox-renderer", // Adjust the selector as needed
                text: "Hello, this is a test comment!"
            }, response => {
                if (response) {
                    console.log(response.status);
                    setIsLoading(false);
                } else {
                    console.log('No response received.');
                }
            });
        });
        
    };
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
            channel_name: channelName,
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
    const video_details = <DescriptionComponent title={videoTitle} channel_name={channelName}/>
    const custom_instructions = <InputField placeholder='Enter Custom Instruction' value={ActiveCard.subcomponents.inputFieldValue1 || ''} onChange={handleInputChange}/>
    return (
    <div className='tones-display-card-container'>   
        <OutlineDisplayCard title="Video Description" children={video_details} />     
        <OutlineDisplayCard title="Custom Instructions" children={custom_instructions} />
        <OutlineDisplayCard title="Tone of the comment" children={small_tag_cards} />
        <Button title='Generate' onClick={handleGenerateClick} loading={isLoading} />
    </div>
);
};

export default VideoComment;