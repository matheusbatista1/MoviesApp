import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppBackground from './components/common/AppBackground';

function App() {
  return (
    <BrowserRouter>
      <div className='relative flex flex-col min-h-screen w-full bg-background-dark overflow-x-hidden'>
        <AppBackground />
        <div className='relative z-10 flex flex-col min-h-screen'>
          <Header />
          <main className='flex-1 flex flex-col'>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;