import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import AdminService from '../services/adminService';
import modernOffice from '../assets/modern-office.png';
import SEO from './SEO';

const Industries = () => {
    const [industries, setIndustries] = useState(() => {
        const info = AdminService.getCompanyInfoSync();
        return info.industries || [];
    });

    useEffect(() => {
        const fetchIndustries = async () => {
            const data = await AdminService.getCompanyInfo();
            if (data && data.industries) {
                setIndustries(data.industries);
            }
        };
        fetchIndustries();

        window.addEventListener('gt_data_update', fetchIndustries);
        return () => window.removeEventListener('gt_data_update', fetchIndustries);
    }, []);

    return (
        <section id="industries" className="services-section" style={{
            position: 'relative',
            backgroundImage: `url(${modernOffice})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            color: '#fff'
        }}>
            <SEO
                title="Industries & Sectors"
                description="GOLDTECH provides domain-specific expertise and specialized IT solutions across Healthcare, Finance, Retail, Manufacturing, and more."
                url="industries"
                keywords="Healthcare IT, Fintech Solutions, Retail Tech, Manufacturing IoT, Energy & Utilities"
            />
            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(5, 16, 33, 0.6)', // Lighter dark overlay
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-title">
                    <h2 style={{ color: '#fff' }}>Industries We Serve</h2>
                    <p style={{ color: '#cbd5e1' }}>Delivering domain-specific expertise across key sectors</p>
                </div>
                <div className="services-grid">
                    {industries.map((item, index) => {
                        const slug = item.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                        const IconComponent = LucideIcons[item.icon] || LucideIcons.HelpCircle;
                        return (
                            <motion.div
                                key={index}
                                className="service-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link to={`/industries/${slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}>
                                    <div className="service-icon" style={{ color: 'var(--color-blue-accent)' }}>
                                        <IconComponent size={40} />
                                    </div>
                                    <h3 style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}>{item.title}</h3>
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

export default Industries;
