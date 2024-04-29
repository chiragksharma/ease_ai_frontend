import React from "react";
import ProfileIcon from "@pages/sidepanel/components/header/profile-icon/index";
import HeaderRight from "@pages/sidepanel/components/header/header-right/index";
import '@pages/sidepanel/components/header/index.scss';


const Header=({toggleTheme})=>{
    const credits = 15;
    return(
        <div className="header-bar">
            <div className="header-bar-container">
            <div className="header-bar-container-left">
                <ProfileIcon imageUrl="https://i.pinimg.com/474x/c8/7b/9d/c87b9d54fd605e1f80074974bfd218b8.jpg" />
            </div>
            <div className="header-bar-container-right">
                <HeaderRight credits={credits}/>
            </div>

            </div>
        </div>
    )
}

export default Header;