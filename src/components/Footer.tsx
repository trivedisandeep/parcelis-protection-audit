const Footer = () => (
  <footer className="bg-secondary py-10 px-6 mt-auto">
    <div className="max-w-5xl mx-auto text-center space-y-3">
      <div className="flex items-center justify-center gap-2 mb-4">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4L6 10v12l10 6 10-6V10L16 4z" stroke="currentColor" strokeWidth="2" fill="none" className="text-secondary-foreground/60"/>
          <path d="M16 10l-5 3v6l5 3 5-3v-6l-5-3z" fill="currentColor" className="text-secondary-foreground/40"/>
        </svg>
        <span className="text-sm font-bold tracking-wider text-secondary-foreground/80 uppercase">Parcelis</span>
      </div>
      <p className="text-secondary-foreground/60 text-sm">
        Licensed package protection backed by InsureShip.
      </p>
      <p className="text-secondary-foreground/60 text-xs">
        Turn package protection into profit. Zero hassle. Real insurance.
      </p>
      <div className="pt-4 border-t border-secondary-foreground/10">
        <p className="text-secondary-foreground/40 text-xs">
          © {new Date().getFullYear()} PARCELIS. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
