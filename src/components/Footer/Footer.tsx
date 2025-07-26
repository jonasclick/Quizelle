import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='flex flex-col items-center gap-1 text-xs opacity-60 mb-2 sm:flex-row sm:justify-center'>
      <p>
        Made with ♥️ in Switzerland • {''}
        <Link className='link' to='/imprint' title='Zurück'>
          Impressum
        </Link>
        {''} • Open Souce on {''}
        <a
          className='link'
          href='https://github.com/jonasclick/Quizelle?tab=readme-ov-file'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub ↗︎
        </a>
      </p>
    </div>
  );
}
