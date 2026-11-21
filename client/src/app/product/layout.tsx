import React from 'react';
import { Header } from '../_components/Header';
import { Footer } from '../_components/Footer';

const layout = ({ children }: { children: any }) => {
  return (
    <div>
        <Header />
      {children}
        <Footer />
    </div>
  )
}

export default layout;
