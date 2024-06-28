import React from 'react';
import './About.css';
import img from '../../assets/bg.jpg'
const About = () => {
  return (
    <div className="about-us-container">
    <header className="about-header">
      <h1>About Us</h1>
      <p>Contact Management System</p>
    </header>
    
    <section className="mission-section">
      <h2>Our Mission</h2>
      <p>
        At Contact Management System, our mission is to provide individuals and businesses with the most intuitive and effective tools for managing their contacts. We strive to simplify the process of contact management, ensuring that our users can focus on building and maintaining meaningful relationships.
      </p>
    </section>
    
    <section className="person-section">
      <h2>About the Founder</h2>
      <div className="person-info">
        <img src={img} alt="Founder" />
        <div className="person-details">
          <h3>Anurag Dubey</h3>
          <p>Full Stack Developer</p>
          <p>
            Hi there! I'm Anurag dubey, a passionate and result-driven MERN Fullstack Developer , leads the team with passion and dedication. His expertise and innovative approach have been instrumental in the development of our platform.
          </p>
          <a href="https://www.linkedin.com/in/anurag-dubey-78458123b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
    
    <section className="contact-section">
      <h2>Contact Us</h2>
      <p>
        We value your feedback and are here to assist you with any queries. Reach out to us at:
      </p>
      <p>
        <strong>Email:</strong> anuragdubeyji2004@gmail.com
        <br />
        <strong>Phone:</strong> +91 9149227454
      </p>
    </section>
  </div>
  );
};

export default About