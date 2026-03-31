import { Button } from "@/components/ui/button";

const Header = () => (
  <header className="bg-secondary py-4 px-6">
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4L6 10v12l10 6 10-6V10L16 4z" stroke="currentColor" strokeWidth="2" fill="none" className="text-secondary-foreground"/>
          <path d="M16 10l-5 3v6l5 3 5-3v-6l-5-3z" fill="currentColor" className="text-secondary-foreground" opacity="0.6"/>
        </svg>
        <span className="text-lg font-bold tracking-wider text-secondary-foreground uppercase">
          Parcelis
        </span>
      </div>
      <Button variant="nav" size="sm" asChild>
        <a href="https://apps.shopify.com/parcelis" target="_blank" rel="noopener noreferrer">
          Get Parcelis
        </a>
      </Button>
    </div>
  </header>
);

export default Header;
