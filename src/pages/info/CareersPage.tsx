import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { motion } from 'framer-motion';

const CareersPage = () => {
  const openings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Community Manager",
      department: "Operations",
      location: "Remote",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <BackButton />
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us build the future of secure commerce and empower communities worldwide.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {[
            { role: 'Project Manager', img: '/team/JushouaPic.jpg',
              anim: {
                initial: { opacity: 0, x: -100, scale: 0.7 },
                whileInView: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', bounce: 0.5, duration: 1 } },
                whileHover: { scale: 1.08, boxShadow: '0 0 32px 0 #f59e42', borderColor: '#f59e42' }
              },
              borderAnim: {
                whileHover: { boxShadow: '0 0 32px 8px #f59e42', borderColor: '#f59e42' }
              }
            },
            { role: 'UI/UX & Frontend', img: '/team/JushouaPic.jpg',
              anim: {
                initial: { opacity: 0, y: -80, scale: 0.7 },
                whileInView: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 1 } },
                whileHover: { boxShadow: '0 0 32px 0 #ec4899', scale: 1.12, borderColor: '#ec4899' }
              },
              borderAnim: {
                whileHover: { boxShadow: '0 0 32px 8px #ec4899', borderColor: '#ec4899' }
              }
            },
            { role: 'Backend', img: '/team/JushouaPic.jpg',
              anim: {
                initial: { opacity: 0, x: 100, scale: 0.7 },
                whileInView: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', duration: 1 } },
                whileHover: { scale: 1.08, boxShadow: '0 0 32px 0 #10b981', borderColor: '#10b981' }
              },
              borderAnim: {
                whileHover: { boxShadow: '0 0 32px 8px #10b981', borderColor: '#10b981' }
              }
            },
            { role: 'Backend', img: '/team/JushouaPic.jpg',
              anim: {
                initial: { opacity: 0, y: 80, scale: 0.7 },
                whileInView: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 1 } },
                whileHover: { scale: 1.1, boxShadow: '0 0 32px 0 #8b5cf6', borderColor: '#8b5cf6' }
              },
              borderAnim: {
                whileHover: { boxShadow: '0 0 32px 8px #8b5cf6', borderColor: '#8b5cf6' }
              }
            },
          ].map((member, idx) => (
            <motion.div
              key={member.role}
              initial={member.anim.initial}
              whileInView={member.anim.whileInView}
              whileHover={member.anim.whileHover}
              transition={{ duration: 0.7, delay: 0.1 * idx, type: 'spring' }}
              viewport={{ once: true }}
              className="bg-white border border-blue-200 rounded-xl shadow-lg flex flex-col items-center p-8 space-y-4 min-h-[320px]"
            >
              {/* Team member image */}
              <motion.div
                className="w-24 h-24 rounded-full overflow-hidden mb-2 shadow-md border-4 border-blue-100"
                whileHover={member.borderAnim.whileHover}
                style={{ borderColor: undefined }}
              >
                <img src={member.img} alt={member.role} className="object-cover w-full h-full" />
              </motion.div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-blue-800 mb-1">Jushoua Oswald G. Santos</h2>
                <p className="text-blue-500 font-medium mb-2">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Application Instructions */}
        <div className="text-center mt-10 animate-fade-in">
          <p className="text-lg text-gray-700 font-medium">
            If you want to apply, send your application to <a href="https://mail.google.com/mail/?view=cm&fs=1&to=santos.jushouaoswald22@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">santos.jushouaoswald22@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
