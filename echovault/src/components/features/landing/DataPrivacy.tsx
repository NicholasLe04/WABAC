import { Shield } from "lucide-react";

const DataPrivacy = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <Shield className="w-24 h-24 text-accent-blue mx-auto md:mx-0" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold">Your Privacy is Paramount</h2>
          <p className="mt-4 text-lg text-text-secondary">
            We believe that your memories are yours alone. WABAC is built with bank-grade security and a commitment to data privacy. We will never sell your data or use it for advertising. You are always in control of your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DataPrivacy; 