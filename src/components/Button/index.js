import styled from 'styled-components';

const Button = styled.button`
  color: var(--white);
  border: 1px solid var(--white);
  background: var(--black);
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 2px;
  text-decoration: none;
  display: inline-block;
  transition: opacity .3s;
  &:hover,
  &:focus{
     opacity: 0.8;
  }
`;

const SuccessButton = styled(Button)`
  background: var(--primary);
  border:  none;
`;

const DangerButton = styled(Button)`
background: var(--secondary);
border:  none;
margin-left: 20px;
`;

const WatchButton = styled(Button)`
  border:  none;
  color: var(--primary);
  background: var(--black);
  transition: opacity .3s;
  display: none;
  margin: 0 auto;
  @media (max-width: 800px) {
    display: block;
  }
`;

export {
  Button, SuccessButton, DangerButton, WatchButton,
};
