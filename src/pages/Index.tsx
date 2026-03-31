import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuditForm from "@/components/AuditForm";

const Index = () => (
  <div className="flex flex-col min-h-screen bg-background">
    <Header />
    <main className="flex-1">
      <AuditForm />
    </main>
    <Footer />
  </div>
);

export default Index;
