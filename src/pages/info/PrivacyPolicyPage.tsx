import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen relative ${darkMode ? 'bg-[#181e29]' : 'bg-[#F8FAFF]'}`}>
      {/* Night mode toggle */}
      <button
        className="absolute top-6 right-8 z-20 bg-white/80 dark:bg-[#232b3a] border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow hover:scale-110 transition-all"
        onClick={() => setDarkMode(m => !m)}
        aria-label="Toggle night mode"
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-700" />}
      </button>
      <div className="p-4">
        <BackButton />
      </div>
      <main className={`flex-1 ${darkMode ? 'text-gray-100' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-xl shadow-md p-8 border ${darkMode ? 'bg-[#232b3a] border-gray-700' : 'bg-white border-gray-100'}`}>
              <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-gray-600 mb-8">Last updated: April 10, 2023</p>
              
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                    <p className="text-gray-700 mb-3">
                      Sellmate ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                    </p>
                    <p className="text-gray-700">
                      Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our service.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                    <p className="text-gray-700 mb-3">We collect several types of information from and about users of our service, including:</p>
                    
                    <h3 className="text-lg font-medium mb-2">2.1 Personal Information</h3>
                    <p className="text-gray-700 mb-3">
                      We may collect personal identification information from users in various ways, including, but not limited to, when users visit our site, register on the site, place an order, fill out a form, and in connection with other activities, services, features or resources we make available on our service.
                    </p>
                    <p className="text-gray-700 mb-3">
                      The personal information we collect may include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                      <li>Name, email address, and contact information</li>
                      <li>Billing information and payment details</li>
                      <li>User preferences and settings</li>
                      <li>For middlemen: government-issued ID for verification purposes</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mb-2">2.2 Non-Personal Information</h3>
                    <p className="text-gray-700 mb-3">
                      We may collect non-personal identification information about users whenever they interact with our service. Non-personal identification information may include browser name, device type, and technical information about users' connection to our service.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                    <p className="text-gray-700 mb-3">
                      We may use the information we collect from you for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                      <li>To provide and maintain our service</li>
                      <li>To process transactions and send related information</li>
                      <li>To verify the identity of middlemen on our platform</li>
                      <li>To send periodic emails regarding your account or other products and services</li>
                      <li>To improve our website and customer service</li>
                      <li>To personalize user experience</li>
                      <li>To respond to inquiries, questions, and/or other requests</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">4. How We Protect Your Information</h2>
                    <p className="text-gray-700 mb-3">
                      We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our service.
                    </p>
                    <p className="text-gray-700 mb-3">
                      Sensitive and private data exchange between our service and its users happens over an SSL secured communication channel and is encrypted and protected with digital signatures.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">5. Sharing Your Information</h2>
                    <p className="text-gray-700 mb-3">
                      We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
                    </p>
                    <p className="text-gray-700 mb-3">
                      We may use third-party service providers to help us operate our business and the service or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">6. Third-Party Websites</h2>
                    <p className="text-gray-700 mb-3">
                      Users may find advertising or other content on our service that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our service.
                    </p>
                    <p className="text-gray-700">
                      Browsing and interaction on any other website, including websites which have a link to our service, is subject to that website's own terms and policies.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
                    <p className="text-gray-700 mb-3">
                      You have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                      <li>Access the personal information we have about you</li>
                      <li>Correct inaccuracies in your personal information</li>
                      <li>Delete your personal information</li>
                      <li>Object to the processing of your personal information</li>
                      <li>Request that we transfer your personal information to another service provider</li>
                    </ul>
                    <p className="text-gray-700">
                      To exercise any of these rights, please contact us at privacy@sellmate.com.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
                    <p className="text-gray-700 mb-3">
                      We have the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
                    </p>
                    <p className="text-gray-700">
                      You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
                    <p className="text-gray-700">
                      If you have any questions about this Privacy Policy, please contact us at privacy@sellmate.com.
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
      <footer className={`py-4 text-center text-sm w-full absolute bottom-0 left-0 ${darkMode ? 'bg-[#232b3a] text-gray-400 border-t border-gray-700' : 'bg-gray-100 text-gray-600'}`}>
        © {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
