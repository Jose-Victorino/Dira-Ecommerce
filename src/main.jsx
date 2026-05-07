/// <reference types="vite/client" />

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ParallaxProvider } from 'react-scroll-parallax'
import { GlobalProvider } from '@/context/Global'
import { scan } from 'react-scan'
import axios from 'axios'

import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if(axios.isAxiosError(error)){
          const RETRYABLE = new Set([408, 429, 502, 503, 504])
          const status = error.response?.status
          return RETRYABLE.has(status) && failureCount < 3
        }
      },
      retryDelay: (attempt) => 2 ** attempt * 200,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    }
  }
})

const withProviders = (providers, children) => (
  providers.reduce((acc, entry) => {
    const [Provider, props] = Array.isArray(entry)
      ? entry : [entry, {}]

    return <Provider {...props}>{acc}</Provider>
  }, children)
)

const providers = [
  BrowserRouter,
  [QueryClientProvider, { client: queryClient }],
  ParallaxProvider,
  GlobalProvider,
]

const envType = import.meta.env.ENV_TYPE

scan({
  enabled: false && envType !== 'production',
  log: true,
})

createRoot(document.getElementById('root')).render(
  withProviders(providers,
    <>
      <App />
      {envType !== 'production' && <ReactQueryDevtools />}
    </>
  )
)