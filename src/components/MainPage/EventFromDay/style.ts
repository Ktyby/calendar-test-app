import styled from 'styled-components';

export const EventFromDayWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 10px;

  button {
    visibility: hidden;
  }
  &:hover button {
    visibility: visible;
  }
`;

export const EventFromDayDescription = styled.div`
  :hover + div {
    background: red;
  }
`;

export const Title = styled.h3`
  text-decoration: underline;
  font-weight: 700;
  color: blue;
  margin-top: 0;
`;

export const Description = styled.p`
  font-weight: 700;
  span {
    font-weight: 300;
  }
`;
