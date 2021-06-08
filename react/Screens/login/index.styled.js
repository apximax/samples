import styled from 'styled-components';

import {
  VerticalRow,
  HorizontalRow,
} from 'Components/basic/layout';

import {BlueButton} from 'Components/basic/buttons';
import {Image} from 'Components/basic/image';
import * as Text from 'Components/basic/texts';

export const Wrapper = styled(VerticalRow)`
  justify-content: flex-start;
  min-height: 100vh;
`;

export const BigHead = styled(Text.BigHead)`
  color: #fff;
  margin-top: 21px;
`;

export const HeaderLogo = styled(Image)`
  width: 83.1px;
  height: 83.1px;
`;

export const ContentWrapper = styled(VerticalRow)`
  flex: 1;
  width: 100%;
  padding: 0 27px;
`;

export const ForgotPasswordLink = styled(Text.Regular)`
  color: #0061f4;
  font-weight: bold;
  text-align: right;
  margin-top: 21px;
  align-self: flex-end;
`;

export const LoginButton = styled(BlueButton)`
  width: 264px;
  margin-top: 100px;
  
  ${props => props.disabled && `
    background-color: rgb(132, 141, 154);
  `}
`;

export const FooterWrapper = styled(HorizontalRow)`
  margin-top: 50px;
  margin-bottom: 33px;
`;

export const MiniLogo = styled(Image)`
  width: 25px;
  height: 25px;
`;

export const FooterText = styled(Text.Regular)`
  font-size: 20px;
  color: #0061f4;
  margin-left: 8px;
`;
