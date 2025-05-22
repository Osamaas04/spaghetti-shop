import Header from "@/components/Header";
import SignUpForm from "@/components/SignUpForm";


export default async function SignUp() {
  
  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <SignUpForm />
      </div>
    </div>
  );
}
