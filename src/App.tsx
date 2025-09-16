import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Testimonials from './components/Testimonials';
import EnglishTest from './components/EnglishTest';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Contact from './components/Contact';
import A11yPanel from './components/A11yPanel';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openContactModal = () => setIsModalOpen(true);
  const closeContactModal = () => setIsModalOpen(false);

  return (
    <>
      <Header onContactClick={openContactModal} />
      <main>
        <Hero />
        <About />
        <Programs />
        <Testimonials />
        <EnglishTest />
      </main>
      <Footer />
      <A11yPanel />

      <Modal isOpen={isModalOpen} onClose={closeContactModal}>
        <Contact />
      </Modal>
    </>
  );
}

export default App;
