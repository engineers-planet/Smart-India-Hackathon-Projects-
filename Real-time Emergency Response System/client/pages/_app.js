import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import Video from '../components/Video';

function MyApp({ Component, pageProps }) {
  const [font, setFont] = useState(true);

  useEffect(() => {
    if (globalThis.document.getElementById('mic-toolbox-fonts-simple')) {
      globalThis.document
        .getElementById('mic-toolbox-fonts-simple')
        .addEventListener('click', () => {
          setFont(!font);
        });
    }
  }, []);

  return (
    <ThemeProvider attribute="class">
      <div class={font ? 'font1' : 'font2'}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
      <Video />
    </ThemeProvider>
  );
}

export default MyApp;
