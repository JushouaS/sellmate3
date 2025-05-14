import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";

const AboutUsPage = () => {
  const missionPoints = [
    "Connecting local freelancers with global opportunities",
    "Secure transactions through trusted middlemen",
    "Building economic bridges for underserved communities",
    "Empowering sellers with tools for success"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <BackButton />
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400">Our Story</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <span className="text-blue-600 dark:text-blue-400">SellMate</span> was founded with a simple yet powerful vision: to create a platform that makes 
            commerce safer and more accessible for everyone.
          </p>
        </div>

        {/* Mission Quote */}
        <Card className="border-blue-200 bg-white/50 backdrop-blur-sm animate-fade-in dark:bg-[#232b3a]/70">
          <CardHeader>
            <CardTitle className="text-center text-2xl italic text-blue-600 dark:text-blue-400">
              "Empowering commerce through trust and accessibility"
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600 dark:text-gray-300">
            Our mission is to bridge the gap between buyers and sellers, creating opportunities
            for growth while ensuring security and trust in every transaction.
          </CardContent>
        </Card>

        {/* Vision Points */}
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          {missionPoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm dark:bg-[#232b3a]/70">
              <CheckCircle className="text-blue-600 dark:text-blue-400 h-6 w-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 dark:text-gray-200">{point}</p>
            </div>
          ))}
        </div>

        {/* Platform Description */}
        <div className="prose max-w-none space-y-6 animate-fade-in">
          <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400">How <span className="text-blue-600 dark:text-blue-400">SellMate</span> Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="text-blue-600 dark:text-blue-400">SellMate</span> is more than just a marketplace - it's a comprehensive ecosystem designed 
            to facilitate secure transactions between buyers and sellers through verified middlemen. 
            Our platform provides the tools, security, and support needed to conduct business 
            confidently in today's digital economy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
