import styled from 'styled-components';

export const HorizontalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const VerticalRow = styled(HorizontalRow)`
  flex-direction: column;
`;
