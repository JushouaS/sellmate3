import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthForm } from "@/components/AuthForm";
import { ShoppingBag, Store, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [step, setStep] = useState<"form" | "role">("form");
  const [loginRole, setLoginRole] = useState<"buyer" | "seller" | "middleman">("buyer");
  const navigate = useNavigate();

  // Called after successful login
  const handleLoginSuccess = () => setStep("role");

  // Called after role selection
  const handleRoleSelect = (role: string) => {
    setLoginRole(role as "buyer" | "seller" | "middleman");
    if (role === "buyer") {
      navigate("/dashboard/buyer");
    } else if (role === "seller") {
      navigate("/dashboard/seller");
    } else if (role === "middleman") {
      navigate("/dashboard/middleman");
    }
  };

  return (
    <AuthLayout
      title={step === "form" ? "Login" : (
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
          <AuthForm type="login" role={loginRole} onSuccess={handleLoginSuccess} />
          <p className="text-center text-base mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
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
                desc: "Access your buyer account"
              },
              {
                role: "seller",
                bg: "bg-green-50",
                iconBg: "bg-green-500",
                icon: <Store size={24} />, 
                title: "Seller",
                titleColor: "text-green-600",
                desc: "Access your seller dashboard"
              },
              {
                role: "middleman",
                bg: "bg-purple-50",
                iconBg: "bg-purple-500",
                icon: <UserCheck size={24} />, 
                title: "Middleman",
                titleColor: "text-purple-600",
                desc: "Access your middleman account"
              }
            ].map((card, i) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * i, type: 'spring' }}
              >
                <div className="hover:scale-105 transition-transform duration-200 cursor-pointer h-full" onClick={() => handleRoleSelect(card.role)}>
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

export default LoginPage;
