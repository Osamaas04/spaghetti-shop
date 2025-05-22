import SignInForm from "@/components/SignInForm";
import Header from "@/components/Header";


export default function SignIn() {
   
  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <SignInForm />
      </div>
    </div>
  );
}
