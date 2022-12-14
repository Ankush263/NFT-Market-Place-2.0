import '../styles/globals.css'
import { NavBar } from '../components/componentsindex';
import { Footer } from '../components/componentsindex';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
