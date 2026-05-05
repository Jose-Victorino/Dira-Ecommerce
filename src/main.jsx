import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ParallaxProvider } from 'react-scroll-parallax'
import { GlobalProvider } from '@/context/Global'
import { scan } from 'react-scan'

import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = error.response?.status
        const RETRYABLE = new Set([408, 429, 502, 503, 504])
        return RETRYABLE.has(status) && failureCount < 3
      },
      retryDelay: (attempt) => 2 ** attempt * 200,
    },
    mutations: {
      retry: false,
    }
  }
})

function withProviders(providers, children) {
  if(!providers.length) return children
  const [Provider, props = {}] = providers[0]
  return (
    <Provider {...props}>
      {withProviders(providers.slice(1), children)}
    </Provider>
  )
}

const providers = [
  [BrowserRouter],
  [QueryClientProvider, { client: queryClient }],
  [ParallaxProvider],
  [GlobalProvider],
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