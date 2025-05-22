// ContactUs.js
import ContactUsForm from "@/components/ContactUsForm";
import Header from "@/components/Header";

export default function ContactUs() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <ContactUsForm />
      </div>
    </div>
  );
}
