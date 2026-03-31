import parcelisLogo from "@/assets/parcelis-logo.png";

const Footer = () => (
  <footer className="py-10 px-6 mt-auto border-t border-border/20">
    <div className="max-w-5xl mx-auto text-center space-y-3">
      <div className="flex items-center justify-center gap-2 mb-4">
        <img src={parcelisLogo} alt="Parcelis" className="h-5 opacity-60" />
      </div>
      <p className="text-muted-foreground text-sm">
        Licensed package protection backed by InsureShip.
      </p>
      <p className="text-muted-foreground/60 text-xs">
        Turn package protection into profit. Zero hassle. Real insurance.
      </p>
      <div className="pt-4 border-t border-border/10">
        <p className="text-muted-foreground/40 text-xs">
          © {new Date().getFullYear()} PARCELIS. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
