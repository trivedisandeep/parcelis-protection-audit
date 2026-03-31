const Footer = () => (
  <footer className="bg-secondary py-8 px-6 mt-auto">
    <div className="max-w-5xl mx-auto text-center space-y-2">
      <p className="text-secondary-foreground/80 text-sm font-medium">
        Backed by industry-leading carrier partnerships and data-driven protection strategies.
      </p>
      <p className="text-secondary-foreground/50 text-xs">
        © {new Date().getFullYear()} Parcelis. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
