import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthForm } from "@/components/AuthForm";
import { ShoppingBag, Store, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SignupPage = () => {
  const [step, setStep] = useState<"form" | "role">("form");
  const [signupRole, setSignupRole] = useState<"buyer" | "seller" | "middleman">("buyer");
  const [showMiddlemanDialog, setShowMiddlemanDialog] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  // Called after successful signup
  const handleSignupSuccess = (userData) => {
    setSignupName(userData.name);
    setSignupEmail(userData.email);
    setSignupPassword(userData.password);
    setStep("role");
  };

  // Called after role selection
  const handleRoleSelect = (role: string) => {
    setSignupRole(role as "buyer" | "seller" | "middleman");
    if (role === "buyer") {
      navigate("/dashboard/buyer");
    } else if (role === "seller") {
      navigate("/dashboard/seller");
    } else if (role === "middleman") {
      setShowMiddlemanDialog(true);
    }
  };

  const handleConfirmMiddleman = () => {
    setShowMiddlemanDialog(false);
    navigate("/apply/middleman", { state: { name: signupName, email: signupEmail, password: signupPassword } });
  };

  const handleCancelMiddleman = () => {
    setShowMiddlemanDialog(false);
  };

  return (
    <AuthLayout
      title={step === "form" ? "Sign Up" : (
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Choose the role you want to continue
            </span>
          </h1>
        </div>
      )}
      subtitle={step === "form" ? "" : ""}
      className="bg-gradient-to-r from-blue-50 to-indigo-50"
      showBackLink={true}
      backLinkUrl="/"
      backLinkText=""
    >
      {step === "form" ? (
        <>
          <AuthForm type="signup" role={signupRole} onSuccess={handleSignupSuccess} />
          <p className="text-center text-base mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
            {[
              {
                role: "buyer",
                bg: "bg-blue-50",
                iconBg: "bg-blue-500",
                icon: <ShoppingBag size={24} />, 
                title: "Buyer",
                titleColor: "text-blue-600",
                desc: "Find trusted middlemen to help with your purchases",
                locked: false
              },
              {
                role: "seller",
                bg: "bg-green-50",
                iconBg: "bg-green-500",
                icon: <Store size={24} />, 
                title: "Seller",
                titleColor: "text-green-600",
                desc: "Sell your products with secure transaction support",
                locked: false
              },
              {
                role: "middleman",
                bg: "bg-purple-50",
                iconBg: "bg-purple-500",
                icon: <UserCheck size={24} />, 
                title: "Middleman",
                titleColor: "text-purple-600",
                desc: "Facilitate safe exchanges between buyers and sellers",
                locked: true
              }
            ].map((card, i) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * i, type: 'spring' }}
              >
                <div
                  className={`hover:scale-105 transition-transform duration-200 h-full ${card.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !card.locked ? handleRoleSelect(card.role) : setShowMiddlemanDialog(true)}
                >
                  <Card className={`overflow-hidden ${card.bg} border-none hover:shadow-md transition-all h-full`}>
                    <div className="p-6 flex flex-col items-center text-center">
                      <motion.div
                        className={`${card.iconBg} text-white rounded-full p-4 mb-4`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.1 * i }}
                      >
                        {card.icon}
                      </motion.div>
                      <h3 className={`text-xl font-semibold ${card.titleColor}`}>{card.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{card.desc}</p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
          <Dialog open={showMiddlemanDialog} onOpenChange={setShowMiddlemanDialog}>
            <DialogContent className="sm:max-w-2xl p-0 bg-white rounded-2xl overflow-hidden shadow-2xl border-0">
              <div className="flex flex-col md:flex-row items-center justify-between w-full h-full" style={{ minHeight: 340 }}>
                {/* Left: Text */}
                <div className="flex-1 flex flex-col items-start justify-center px-8 py-10 bg-white">
                  <div className="text-4xl font-extrabold mb-2 text-gray-900">
                    <span className="text-gray-700">NOW </span>
                    <span className="text-yellow-500">WE ARE</span>
                  </div>
                  <div className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">HIRING</div>
                  <div className="text-orange-500 font-semibold text-sm mb-8" style={{ letterSpacing: 1 }}>
                    ARE YOU<br />READY<br />TO JOIN US?
                  </div>
                </div>
                {/* Right: Image and Button */}
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 bg-white">
                  <div className="rounded-3xl overflow-hidden shadow-lg mb-8" style={{ width: 280, height: 160 }}>
                    <img
                      src="https://img.freepik.com/free-photo/business-people-group-background_53876-104897.jpg?w=740&q=80"
                      alt="Hiring"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <Button
                    className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-3 rounded-full text-lg font-bold shadow-lg tracking-wide"
                    style={{ letterSpacing: 2 }}
                    onClick={handleConfirmMiddleman}
                  >
                    FILL UP
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
      <footer className="mt-10 text-center text-sm text-gray-500">
        <div className="flex justify-center flex-wrap space-x-4 mb-2">
          <a href="/about" className="hover:text-blue-600">About Us</a>
          <a href="/careers" className="hover:text-blue-600">Careers</a>
          <a href="/blog" className="hover:text-blue-600">Blog</a>
          <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
          <a href="/security" className="hover:text-blue-600">Security</a>
        </div>
        <p>© {new Date().getFullYear()} Sellmate. All rights reserved.</p>
      </footer>
    </AuthLayout>
  );
};

export default SignupPage;
