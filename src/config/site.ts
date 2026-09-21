export const siteConfig = {
  name: 'Parafia Trójcy Świętej w Żeliszewie',
  description: 'Nowoczesna strona internetowa parafii katolickiej.',
  address: 'Żeliszew Podkościelny 28',
  phone: '25 642-06-07',
  email: '',
  socialLinks: [] as Array<{ label: string; href: string }>,
};

export const navigationItems = [
  { label: 'Strona główna', href: '/' },
  { label: 'Ogłoszenia', href: '/ogloszenia' },
  { label: 'Wydarzenia', href: '/wydarzenia' },
  { label: 'Intencje mszalne', href: '/intencje-mszalne' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Sakramenty', href: '/sakramenty' },
  { label: 'Księża', href: '/duszpasterze' },
  { label: 'Grupy parafialne', href: '/grupy-parafialne' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const footerLinks = [
  { label: 'Historia parafii', href: '/historia' },
  { label: 'Sakramenty', href: '/sakramenty' },
  { label: 'Kancelaria parafialna', href: '/kancelaria-parafialna' },
  { label: 'Księża', href: '/duszpasterze' },
  { label: 'Grupy parafialne', href: '/grupy-parafialne' },
  { label: 'Galeria', href: '/galeria' },
];
