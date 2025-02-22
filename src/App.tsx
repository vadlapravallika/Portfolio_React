import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Monitor, Database, Palette, ChevronDown, Star, Coffee,
  GraduationCap, Briefcase, ArrowUp, Sun, Moon, Download, Send,
} from 'lucide-react';
import { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { motion, useAnimation } from 'framer-motion';
import Confetti from 'react-confetti';

// Lazy-loaded components
const Particles = lazy(() => import('react-tsparticles'));

// Replace with your photo
import profilePhoto from './profile.jpg'; // Add your photo in the src folder

function App() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();

  // Contact Form State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
    console.log('Form Data:', formData);
  };

  // Open email client
  const handleLetsChat = () => {
    window.location.href = 'mailto:pravalli541@gmail.com';
  };

  // Initialize particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Show/hide scroll arrow
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollArrow(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading screen
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading
  }, []);

  // Scroll to hero section
  const scrollToHero = () => {
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 bg-blue-500/20 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />

      {/* Floating Scroll Arrow */}
      {showScrollArrow && (
        <button
          onClick={scrollToHero}
          className="fixed bottom-8 right-8 p-4 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-all transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="text-white" size={24} />
        </button>
      )}

      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-slate-900 dark:text-white">Pravallika</span>
          <ul className="flex gap-6">
            {[
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={24} className="text-slate-900 dark:text-white" /> : <Moon size={24} className="text-slate-900 dark:text-white" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={heroSectionRef} className="min-h-screen relative flex items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: {
                color: {
                  value: isDarkMode ? '#0f172a' : '#ffffff', // Dynamic background based on theme
                },
              },
              particles: {
                number: {
                  value: 50,
                },
                size: {
                  value: 3,
                },
                color: {
                  value: '#3b82f6', // Blue particles
                },
                links: {
                  color: '#3b82f6', // Blue links
                },
              },
            }}
            className="absolute inset-0"
          />
        </Suspense>
        <div className="container mx-auto px-6 py-24 relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
          >
            <img
              src={profilePhoto}
              alt="Pravallika"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Pravallika</span>
            </h1>
            <p className="text-2xl md:text-2xl text-slate-700 dark:text-slate-300 mb-12 leading-relaxed">
              I craft exceptional digital experiences with modern web technologies.
              Specializing in React, TypeScript, and creative UI/UX solutions.
            </p>
            <div className="flex gap-6 items-center">
              <a href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105">
                Let's Talk
              </a>
              <a
                href="/path/to/resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-all transform hover:scale-105"
              >
                <Download className="text-white" size={20} />
                <span>Download Resume</span>
              </a>
              <div className="flex gap-4">
                <a href="https://github.com/vadlapravallika?tab=repositories" className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/pravallika-vadla/" className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:pravalli541@gmail.com" className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-slate-700 dark:text-slate-300" />
        </div>
      </header>

      {/* About Section */}
      <section id="about">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900 dark:text-white">
              <Star className="text-yellow-400" />
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 text-slate-700 dark:text-slate-300">
                <p className="text-lg leading-relaxed">
                  With over 3 years of experience in front-end development, I've had the privilege of working with cutting-edge technologies and amazing teams to create impactful digital solutions.
                </p>
                <p className="text-lg leading-relaxed">
                  My approach combines technical expertise with creative problem-solving, ensuring that every project not only functions flawlessly but also delivers an exceptional user experience.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Quick Facts</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Coffee className="text-blue-500" />
                    <span>Based in Chicago, IL</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Code2 className="text-blue-500" />
                    <span>3+ Years of Development Experience</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Monitor className="text-blue-500" />
                    <span>10+ Projects Completed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-32" id="education">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900 dark:text-white">
            <GraduationCap className="text-blue-500" />
            Education
          </h2>
          <div className="space-y-12">
            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-blue-500">Master of Information Technology and Management</h3>
                <span className="text-slate-500 dark:text-slate-400">2023 - 2025</span>
              </div>
              <h4 className="text-xl text-slate-700 dark:text-slate-300 mb-4">Illinois Institute of Technology Chicago University</h4>
              <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-2">
                <li>Specialized in Fullstack Development, SDLC, Human-Computer Interaction, Web Systems Integration, and Object-Oriented Applications</li>
                <li>Senator of DEI and Engagement at Student Government by Illinois Tech</li>
                <li>GPA: 4.0/4.0</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-blue-500">Bachelor of Science in Computer Science</h3>
                <span className="text-slate-500 dark:text-slate-400">2015 - 2019</span>
              </div>
              <h4 className="text-xl text-slate-700 dark:text-slate-300 mb-4">Jawaharlal Nehru Technological University Kakinada</h4>
              <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-2">
                <li>Minor in Computer Science</li>
                <li>President of Web Development Club</li>
                <li>GPA: 3.65/4.0</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900 dark:text-white">
            <Briefcase className="text-purple-500" />
            Professional Experience
          </h2>
          <div className="space-y-12">
            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-purple-500">Frontend Developer</h3>
                <span className="text-slate-500 dark:text-slate-400">2022 - 2023</span>
              </div>
              <h4 className="text-xl text-slate-700 dark:text-slate-300 mb-4">Tata Consultancy Services, Hyderabad, India</h4>
              <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-2">
                <li>Designed 30+ responsive web pages using React.js, HTML, CSS, and PHP, enhancing user engagement by 25%</li>
                <li>Developed secure RESTful APIs integrated with Spring Boot, improving backend performance and scalability</li>
                <li>Reduced application bundle size by 45% through code splitting and lazy loading</li>
                <li>Collaborated with teams to troubleshoot issues, optimizing performance and reducing system downtime by 20%</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-purple-500">Administrator</h3>
                <span className="text-slate-500 dark:text-slate-400">2019 - 2021</span>
              </div>
              <h4 className="text-xl text-slate-700 dark:text-slate-300 mb-4">Wipro Technologies, Hyderabad, India</h4>
              <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-2">
                <li>Resolved 95% of technical issues for Outlook, O365, and Global Protect at the 1st and 2nd support levels, ensuring seamless operations</li>
                <li>Managed 500+ user accounts and maintained 99.9% system uptime through efficient Windows OS and network troubleshooting</li>
                <li>Delivered IT support for ICICI Bank, ensuring efficient issue resolution using the Finacle ticketing system</li>
                <li>Resolved escalated hardware/software issues, improving customer satisfaction scores by 15%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32" id="skills">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900 dark:text-white">
            <Database className="text-blue-500" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                skills: ["React.js", "JavaScript", "HTML & CSS", "Tailwind CSS"],
                icon: <Code2 className="text-blue-500" />,
                color: "from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900"
              },
              {
                title: "UI/UX Design",
                skills: ["Figma", "Responsive Design"],
                icon: <Palette className="text-purple-500" />,
                color: "from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900"
              },
              {
                title: "Backend Integration",
                skills: ["Java", "Flask", "Spring Boot", "Node.js", "Express.js"],
                icon: <Database className="text-green-500" />,
                color: "from-green-100 to-green-200 dark:from-green-800 dark:to-green-900"
              }
            ].map((category, index) => (
              <div key={index} className={`p-8 rounded-2xl bg-gradient-to-br ${category.color} backdrop-blur-lg border border-white/10`}>
                <div className="mb-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-slate-700 dark:text-slate-300">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900 dark:text-white">
            <Monitor className="text-green-500" />
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Mood Music App",
                description: "Mood Music offers a unique combination of music, mental wellness, and entertainment in one platform!",
                image: "/MoodMusic.jpg",
                tech: ["React.js", "Tailwind CSS", "React Router"]
              },
              {
                title: "Task Management App",
                description: "A collaborative task management tool with real-time updates and team features.",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
                tech: ["Vue", "Firebase", "Tailwind"]
              }
            ].map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-700 shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-700 to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">{project.description}</p>
                  <div className="flex gap-3 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-100 dark:bg-slate-600 rounded-full text-sm text-slate-700 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                       href="https://github.com/vadlapravallika/moodmusic-app" 
                       className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                       target="_blank" 
                       rel="noopener noreferrer"><Github size={18} /><span>View Code</span>
                    </a>
                    <a 
                       href="https://moodmusic-app-valli-git-main-pravallika-vadlas-projects.vercel.app/" 
                       className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                      target="_blank"  rel="noopener noreferrer" ><ExternalLink size={18} /><span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative overflow-hidden" id="contact">
        {/* Confetti Animation */}
        {isSubmitted && <Confetti recycle={false} numberOfPieces={500} gravity={0.2} />}

        {/* Gradient Background */}
      

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900 dark:text-white">
            <Mail className="text-purple-500" />
            Get In Touch
          </h2>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow transform hover:scale-105 flex flex-col justify-center items-center text-center"
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Let's Chat</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-8">
                Thank you for trusting me! Feel free to reach me on these platforms.
              </p>
              <button
                onClick={handleLetsChat}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-8"
              >
                <Mail size={20} />
                <span>Let's Chat</span>
              </button>
              <div className="flex gap-6">
                <a
                  href="https://github.com/vadlapravallika"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/pravallika-vadla/"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:pravalli541@gmail.com"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
                >
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 dark:text-slate-300">© 2024 Pravallika Developer. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com/vadlapravallika" className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/pravallika-vadla/" className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:pravalli541@gmail.com" className="text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;