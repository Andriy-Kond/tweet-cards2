import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Container } from './Container/Container';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { PreLoader } from './Preloader/PreLoader';

const SharedLayout = () => {
  return (
    <Container>
      <main>
        <Header />
        <Suspense fallback={<PreLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </Container>
  );
};

export default SharedLayout;
