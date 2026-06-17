import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import AdminService from '../services/adminService';
import imBg from '../assets/im.png';
import SEO from './SEO';

const Services = () => {
    const [services, setServices] = useState(() => {
        const info = AdminService.getCompanyInfoSync();
        return info.services || [];
    });

    useEffect(() => {
        const fetchServices = async () => {
            const data = await AdminService.getCompanyInfo();
            if (data && data.services) {
                setServices(data.services);
            }
        };
        fetchServices();

        window.addEventListener('gt_data_update', fetchServices);
        return () => window.removeEventListener('gt_data_update', fetchServices);
    }, []);

    return (
        <section id="services" className="services-section" style={{
            position: 'relative',
            backgroundImage: `url(${imBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            color: '#fff' // Ensure text is readable on dark overlay
        }}>
            <SEO
                title="Global IT Services & Solutions"
                description="Explore GOLDTECH's comprehensive range of enterprise IT services: Custom Software, Cloud Infrastructure, Cybersecurity, and AI Innovation."
                url="services"
                keywords="Managed IT Services, Cybersecurity, Cloud Infrastructure, AI & ML, Digital Transformation"
            />
            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(15, 23, 42, 0.6)', // Lighter dark blue overlay
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-title">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ color: '#fff' }}
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ color: '#cbd5e1' }}
                    >
                        Empowering your business with cutting-edge technology solutions
                    </motion.p>
                </div>
                <div className="services-grid">
                    {services.map((item, index) => {
                        const slug = item.title.toLowerCase().replace(/\s*&\s*/g, '-and-').replace(/\s+/g, '-');
                        const IconComponent = LucideIcons[item.icon] || LucideIcons.HelpCircle;
                        return (
                            <motion.div
                                key={index}
                                className="service-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/services/${slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}>
                                    <IconComponent className="service-icon" />
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
