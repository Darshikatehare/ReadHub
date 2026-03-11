import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Zap, 
  Library, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-nav-container">
          <div className="landing-logo">
            <Library size={24} className="text-primary-400" />
            <span>ReadHub</span>
          </div>
          
          <nav className="landing-nav-links">
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="landing-auth-btns">
            <button className="btn-link">Login</button>
            <button className="btn-signup">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-viewport">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="video-background"
        >
          <source src="/media/uhd_25fps.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
        
        <div className="landing-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hero-section"
          >
            <div className="brand-badge">
              <Zap size={16} />
              <span>Smart Library Architecture</span>
            </div>
            
            <h1 className="hero-title">
              Elevating the <br /> 
              Reading Experience
            </h1>
            
            <p className="hero-description">
              The world's most advanced library management platform. 
              Seamlessly bridge the gap between physical collections and digital efficiency.
            </p>

            <div className="cta-group">
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-get-started"
              >
                Access Dashboard
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary-landing">
                Explore Library
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-main-title">Why ReadHub?</h2>
            <p className="section-sub-text">Everything you need to manage a modern library at scale.</p>
          </div>

          <div className="features-grid-landing">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="feature-card-premium"
            >
              <div className="feature-icon-wrapper blue">
                <BookOpen size={28} />
              </div>
              <h3>Intelligent Cataloging</h3>
              <p>Automated book details fetching and real-time inventory synchronization.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="feature-card-premium"
            >
              <div className="feature-icon-wrapper purple">
                <ShieldCheck size={28} />
              </div>
              <h3>Secure Borrowing</h3>
              <p>Advanced role-based access control and encrypted user data management.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="feature-card-premium"
            >
              <div className="feature-icon-wrapper emerald">
                <Globe size={28} />
              </div>
              <h3>Global Access</h3>
              <p>Cloud-native infrastructure allowing you to manage your library from anywhere.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About / Stats Section */}
      <section id="about" className="scroll-section dark-bg">
        <div className="section-container">
          <div className="stats-showcase">
            <div className="stat-item">
              <h4>10k+</h4>
              <p>Books Managed</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h4>5k+</h4>
              <p>Active Users</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h4>99.9%</h4>
              <p>System Uptime</p>
            </div>
          </div>
          
          <div className="about-content-box">
             <h2>Our Mission</h2>
             <p>
                To empower communities through accessible knowledge. ReadHub provides 
                the digital backbone for libraries to focus on what matters most: 
                fostering a love for reading and learning.
             </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="landing-logo">
              <Library size={24} className="text-primary-400" />
              <span>ReadHub</span>
            </div>
            <p className="footer-bio">
              Modernizing library systems with cutting-edge technology and human-centric design.
            </p>
            <div className="social-links">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-col">
              <h5>Quick Links</h5>
              <a href="#">Home</a>
              <a href="#">Features</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-col">
              <h5>Policies</h5>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">GDPR</a>
            </div>
            <div className="link-col">
              <h5>Contact Us</h5>
              <div className="footer-contact-item">
                <Mail size={16} />
                <span>support@readhub.io</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>123 Innovation Way, Tech City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ReadHub Library Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

