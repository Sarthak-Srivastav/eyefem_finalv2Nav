import { ReactNode } from 'react';
import EyeCareNavbar from './EyeCareNavbar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import CustomWhatsAppWidget from './CustomWhatsAppWidget';

interface EyeCareLayoutProps {
  children: ReactNode;
}

const EyeCareLayout = ({ children }: EyeCareLayoutProps) => {
  return (
      <div className="min-h-screen flex flex-col">
        <EyeCareNavbar />
      <main className="flex-1 pt-20">
        <PageTransition>
            {children}
        </PageTransition>
        </main>
        <Footer />
        <CustomWhatsAppWidget 
            doctorName="Dr. Sanjeev Lehri"
            phoneNumber="919811150984"
        />
      </div>
  );
};

export default EyeCareLayout;
