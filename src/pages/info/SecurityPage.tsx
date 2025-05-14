import { Shield, Lock, FileCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: <Lock className="h-6 w-6 text-green-600" />,
      title: "End-to-End Encryption",
      description: "All communications between users are encrypted using industry-standard protocols to ensure your privacy."
    },
    {
      icon: <FileCheck className="h-6 w-6 text-blue-600" />,
      title: "Identity Verification",
      description: "We verify all middlemen through a rigorous process that includes government ID verification and background checks."
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      title: "Fraud Detection",
      description: "Our advanced systems monitor for suspicious activity and alert our security team to potential fraud."
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Secure Payments",
      description: "Payment information is handled by trusted third-party processors and is never stored on our servers."
    }
  ];

  const faqs = [
    {
      question: "How do you verify middlemen?",
      answer: "We use a multi-step verification process that includes government ID verification, address verification, background checks, and a review of professional qualifications. Each middleman also undergoes a video interview with our team."
    },
    {
      question: "What happens if a transaction goes wrong?",
      answer: "Our platform includes a dispute resolution system. If there's an issue with a transaction, both parties can raise a dispute, which will be reviewed by our team. Depending on the circumstances, we may issue refunds or take other appropriate actions."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take data protection seriously. We encrypt all personal data, limit access to only authorized personnel, and regularly audit our security practices. We also comply with all relevant data protection regulations."
    },
    {
      question: "How do I report suspicious activity?",
      answer: "If you notice suspicious behavior from any user on our platform, please use the 'Report' button on their profile or contact our security team at security@sellmate.com. We investigate all reports promptly."
    },
    {
      question: "What security measures do you have in place for payments?",
      answer: "We use industry-standard payment processors that are PCI DSS compliant. Your payment information is encrypted and never stored on our servers. We also offer escrow services for high-value transactions, where funds are held securely until all parties confirm the transaction is complete."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <div className="p-4">
        <BackButton />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-6">Security at Sellmate</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing a secure platform for all users. 
                Learn how we protect your information and transactions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-16">
              <h2 className="text-2xl font-semibold mb-6">Our Security Promise</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-gray-700">We verify the identity of all middlemen on our platform.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-gray-700">We monitor transactions for suspicious activity.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-gray-700">We provide secure communication channels between users.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-gray-700">We offer dispute resolution for any transaction issues.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-gray-700">We comply with all relevant data protection laws and regulations.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Security FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

export default SecurityPage;
