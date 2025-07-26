import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import imprintMd from '../Imprint/imprint.md?raw';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImprintPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className='flex-grow'>
        {/* Navigation */}
        <div className='flex justify-end px-4 mt-6'>
          <ul className='menu menu-horizontal bg-base-200 rounded-box'>
            <li>
              <Link to='/' title='Zurück'>
                <ChevronRight className='w-5 h-5' />
              </Link>
            </li>
          </ul>
        </div>

        {/* Impressum */}

        <p className='mx-15 mb-8'>
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {imprintMd}
          </ReactMarkdown>
        </p>
      </main>
      <Footer />
    </div>
  );
}
