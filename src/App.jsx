import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./Landing";
import "./App.css";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 3, // Cache for 5 minutes
        cacheTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    },
  });
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
