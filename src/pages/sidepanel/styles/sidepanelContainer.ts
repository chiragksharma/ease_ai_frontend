import styled from 'styled-components';

const SidePanelContainer = styled.div`
  background-color: ${props => props.theme.mode === 'dark' ? 'var(--dark-background)' : 'var(--light-background)'};
  color: ${props => props.theme.mode === 'dark' ? 'var(--dark-text)' : 'var(--light-text)'};
`;
export default SidePanelContainer;
