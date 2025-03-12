import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./Landing";
import "./App.css";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <Landing />
      </QueryClientProvider>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-width: 99vw;
`;
