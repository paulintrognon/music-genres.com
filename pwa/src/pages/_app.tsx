import Router from 'next/router'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { BASE_API_URL } from '../services/api/api'
import { Provider } from 'react-redux'
import store from '../redux/store'
import ConnectedPlayer from '../components/Shared/Molecules/Player/Player/Player.connect'
import '../styles/styles.scss'
import '../styles/flexboxgrid.min.css'

Router.events.on('routeChangeComplete', () => {
  window.scrollTo(0, 0)
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <SWRConfig
    value={{
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fetcher: (url, init) => fetch(`${BASE_API_URL}${url}`, init).then((res) => res.json()),
    }}
  >
    <Provider store={store}>
      <ConnectedPlayer />
      <Component {...pageProps} />
    </Provider>
  </SWRConfig>
)

export default App
