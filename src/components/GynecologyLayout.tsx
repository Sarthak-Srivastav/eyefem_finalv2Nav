import { ReactNode } from 'react';
import GynecologyNavbar from './GynecologyNavbar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import CustomWhatsAppWidgetNisha from './CustomWhatsAppWidgetNisha';

interface GynecologyLayoutProps {
  children: ReactNode;
}

const GynecologyLayout = ({ children }: GynecologyLayoutProps) => {
  return (
      <div className="min-h-screen flex flex-col">
        <GynecologyNavbar />
      <main className="flex-1 pt-20">
        <PageTransition>
            {children}
        </PageTransition>
        </main>
        <Footer />
        <CustomWhatsAppWidgetNisha 
          doctorName="Dr. Nisha Bhatnagar"
          phoneNumber="91 9899557022"
        />
      </div>
  );
};

export default GynecologyLayout;
