import React from 'react';
import HeroVideo from './HeroVideo';
import Services from './Services';
import Industries from './Industries';
import Insights from './Insights';
import SocialFeeds from './SocialFeeds';
import Testimonials from './Testimonials';
import BookingModal from './BookingModal';
import ContactForm from './ContactForm';
import About from './About';
import Products from './Products';
import Career from './Career';
import SEO from './SEO';

const Home = () => {
    return (
        <>
            <SEO
                title="GOLDTECH | Elite IT Solutions & AI Consulting"
                description="GOLDTECH: Transform your business with elite AI automation, scalable Cloud architecture, and custom software development. The Gold Standard of Fintech Infrastructure."
                keywords="GOLDTECH, GOLD TECH, GoldTech IT Solutions, IT Services Hyderabad, AI Strategy, Cloud Computing, Software Development, Fintech"
            />
            {/* Visually Hidden H1 for SEO */}
            <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
                GOLDTECH | Elite IT Solutions & Digital Transformation Firm
            </h1>
            <HeroVideo />

            <BookingModal /> {/* Call to Action area */}
            <Services />
            <Industries />
            <Insights />
            <About />
            <Products />
            <Career />
            <SocialFeeds /> {/* GitHub/LinkedIn */}
            <Testimonials /> {/* Google Reviews */}
            <ContactForm />
        </>
    );
};

export default Home;
