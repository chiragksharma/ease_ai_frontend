import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #0A1330;
    --color-secondary: #E6E6E6;
    --color-accent: #FFC107;
    --color-background: #F7F8FC; 

    // Text color
    --color-text: #121111; 

    // Fonts 
    --font-primary: 'Manrope', sans-serif;
    --font-secondary: 'Poppins', sans-serif;

    // Component specific
    --creditcounter-bg-light: #D9D9D9;
    --creditcounter-text-light: #0B1739;
  }


  .dark-theme {
    --color-background: #0A1330; 
    --color-text: #FFFFFF; 

    //credit counter component specific
    --creditcounter-bg-light: #091128;
    --creditcounter-text-light: #FFFFFF;
  }
`;

export default GlobalStyle;
