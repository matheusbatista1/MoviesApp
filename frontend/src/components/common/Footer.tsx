import type { FC } from 'react';

const COPYRIGHT_TEXT = {
  RIGHTS_RESERVED: '© Todos os direitos reservados a Cubos Movies',
  CURRENT_YEAR: new Date().getFullYear(),
} as const;

const footerStyles = {
  container:
    'font-montserrat w-full text-text-footer text-sm sm:text-base text-center px-2 sm:px-4 py-3 sm:py-4 border-t-footer-top border-footer-top bg-transparent',
} as const;

const Footer: FC = () => {
  return (
    <footer className={footerStyles.container}>
      {COPYRIGHT_TEXT.CURRENT_YEAR} {COPYRIGHT_TEXT.RIGHTS_RESERVED}
    </footer>
  );
};

export default Footer;
