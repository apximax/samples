import styled from 'styled-components';

export const Button = styled.div`
  height: 48px;
  padding: 0 28px;
  border-radius: 33px;
  background-color: transparent;
  
  border: solid 1px #ffffff;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

export const WhiteButton = styled(Button)`
  background-color: #fff;
  color: #0061f4;
`;

export const WhiteButtonWithBorder = styled(WhiteButton)`
  border: solid 1px #0061f4;
`;

export const BlueButton = styled(Button)`
  background-color: #0061f4;
  color: #fff;
`;
