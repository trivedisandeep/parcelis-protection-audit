import { Button } from "@/components/ui/button";

const Header = () => (
  <header className="bg-secondary py-4 px-6">
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <span className="text-2xl font-extrabold tracking-tight text-secondary-foreground">
        PARCELIS
      </span>
      <Button variant="nav" size="sm" asChild>
        <a href="https://myparcelis.com" target="_blank" rel="noopener noreferrer">
          Get Started
        </a>
      </Button>
    </div>
  </header>
);

export default Header;
