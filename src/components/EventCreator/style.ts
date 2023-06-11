import styled from 'styled-components';

export const EventCreatorWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 320px;

  margin: 0 auto;
`;

export const EventCreatorActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Field = styled('label')<{ hasError?: boolean }>`
  display: flex;
  flex-direction: column;

  span {
    color: red;
  }

  input {
    background-color: ${(props) => props.hasError && 'rgba(255, 0, 0, 0.5)'};
  }
`;
