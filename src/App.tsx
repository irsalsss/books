import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'antd/dist/antd.min.css';
import Routes from 'routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
