import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, socials }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group">
      <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-emerald-600 dark:text-emerald-400 mb-4">{role}</p>
        
        <div className="flex space-x-3">
          {socials.linkedin && (
            <a 
              href={socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <Linkedin size={20} />
            </a>
          )}
          {socials.twitter && (
            <a 
              href={socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
              aria-label={`${name}'s Twitter profile`}
            >
              <Twitter size={20} />
            </a>
          )}
          {socials.email && (
            <a 
              href={`mailto:${socials.email}`}
              className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Jawher Sadok",
      role: "Team Leader",
      image: "/Jawher.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/jawher-sadok/",
        twitter: "https://x.com/Jawher_Sadok",
        email: "jawher.sadok@supcom.tn"
      }
    },
    {
      name: "Zayd Ben Fadhel",
      role: "Team Member",
      image: "/Zayd.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/zaydbenfadhel/",
        twitter: "https://x.com/FadhelZayd",
        email: "zayd.benfadhel@supcom.tn"
      }
    },
    {
      name: "Mohamed Mdhaffar",
      role: "Team Member",
      image: "/mdhaffar.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/mohamed-mdhafar-08707b280/",
        twitter: "https://x.com/MMedhaffar56798",
        email: "mohamed.mdhaffar@supcom.tn"
      }
    },
    {
      name: "Youssef Chatti",
      role: "Team Member",
      image: "/Youssef.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/youssef-chatti-811351329/",
        twitter: "https://www.facebook.com/youssef.chatti.16",
        email: "youssefchatti420@gmail.com"
      }
    }
  ];
  return (
    <section id="team" className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Our Team
          </h2>
          <div className="mt-2 h-1 w-20 bg-emerald-500 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the experts behind CARBONSENS, combining expertise in environmental science, IoT technology, and artificial intelligence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              socials={member.socials}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Team;