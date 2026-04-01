import parcelisLogo from "@/assets/parcelis-logo.png";

const Header = () => (
  <header className="py-5 px-6 border-b border-border/30">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <img src={parcelisLogo} alt="Parcelis" className="h-9 sm:h-10" />
      <a
        href="https://apps.shopify.com/parcelis"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-accent-foreground bg-accent hover:bg-accent/85 rounded-full px-6 py-2.5 transition-colors shadow-sm"
      >
        Get Parcelis
      </a>
    </div>
  </header>
);

export default Header;
