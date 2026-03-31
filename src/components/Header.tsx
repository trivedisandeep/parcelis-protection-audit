import parcelisLogo from "@/assets/parcelis-logo.png";

const Header = () => (
  <header className="py-5 px-6 border-b border-border/30">
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <img src={parcelisLogo} alt="Parcelis" className="h-7" />
      <a
        href="https://apps.shopify.com/parcelis"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full px-5 py-2 transition-colors"
      >
        Get Parcelis
      </a>
    </div>
  </header>
);

export default Header;
