import { Button } from "@/components/ui/button";
import parcelisLogo from "@/assets/parcelis-logo.png";

const Header = () => (
  <header className="bg-secondary py-4 px-6">
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <img src={parcelisLogo} alt="Parcelis" className="h-8" />
      <Button variant="nav" size="sm" asChild>
        <a href="https://apps.shopify.com/parcelis" target="_blank" rel="noopener noreferrer">
          Get Parcelis
        </a>
      </Button>
    </div>
  </header>
);

export default Header;
