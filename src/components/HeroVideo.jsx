import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminService from '../services/adminService';

// Import Videos
import aiVideo from '../assets/Artificial_Intelligence_AI_Stock_Footage_Video_1440P (1).mp4';
import smartCityVideo from '../assets/Smart_City_Digital_City_Video_2160P.mp4';
import p1Video from '../assets/InShot_P1.mp4';
import p2Video from '../assets/InShot_p2.mp4';
import p3Video from '../assets/InShot_P3.mp4';
import p4Video from '../assets/GT6.mp4';

import heroPoster from '../assets/hero-poster.jpg';
import fallbackImage from '../assets/modern-office.png';

const localVideos = [aiVideo, smartCityVideo, p1Video, p2Video, p3Video, p4Video];

const isVideoUrl = (url) => {
    if (!url) return false;
    const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.3gp'];
    return videoExtensions.some(ext => cleanUrl.endsWith(ext)) || url.includes('video');
};

const HeroVideo = () => {
    const [current, setCurrent] = useState(0);
    const [slides, setSlides] = useState(() => {
        const info = AdminService.getCompanyInfoSync();
        return (info.heroSlides || []).filter(Boolean);
    });
    const videoRefs = React.useRef([]);

    // Auto-advance slide with variable duration
    useEffect(() => {
        if (!slides || slides.length === 0) return;
        const currentSlide = slides[current] || slides[0];
        const slideDuration = currentSlide.duration || 10000; // Default to 10s if not specified

        const timer = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, slideDuration);

        return () => clearTimeout(timer);
    }, [current, slides]);

    // Reset and play video when it becomes active
    useEffect(() => {
        if (!slides || slides.length === 0) return;
        videoRefs.current.forEach((vid, index) => {
            if (vid) {
                if (index === current) {
                    vid.currentTime = 0;
                    vid.playbackRate = 0.5; // Ensure slow speed is maintained
                    vid.play().catch(e => {
                        if (e.name !== 'AbortError') console.warn("Video play failed:", e);
                    });
                } else {
                    vid.pause();
                }
            }
        });
    }, [current, slides]);

    useEffect(() => {
        const fetchSlides = async () => {
            const data = await AdminService.getCompanyInfo();
            if (data && data.heroSlides) {
                setSlides(data.heroSlides.filter(Boolean));
            }
        };
        fetchSlides();

        window.addEventListener('gt_data_update', fetchSlides);
        return () => window.removeEventListener('gt_data_update', fetchSlides);
    }, []);

    const nextSlide = () => {
        if (!slides || slides.length === 0) return;
        setCurrent((prev) => (prev + 1) % slides.length);
    };
    const prevSlide = () => {
        if (!slides || slides.length === 0) return;
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (!slides || slides.length === 0) {
        return null;
    }

    const currentSlide = slides[current] || slides[0];

    return (
        <section className="hero-video" style={{ position: 'relative', height: '95vh', overflow: 'hidden', background: '#000' }}>
            {/* Video Background Layer */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}>
                {slides.map((slide, index) => {
                    const hasCustomMedia = !!slide.customMediaUrl;
                    const isVideo = !hasCustomMedia || isVideoUrl(slide.customMediaUrl);
                    const videoSrc = hasCustomMedia ? slide.customMediaUrl : (localVideos[slide.videoIndex] || localVideos[index % 6] || localVideos[0]);
                    return (
                        <motion.div
                            key={slide.id !== undefined ? slide.id : index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: index === current ? 1 : 0 }}
                            transition={{ duration: 1.5 }} // Slower crossfade
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                zIndex: index === current ? 1 : 0
                            }}
                        >
                            {isVideo ? (
                                <video
                                    src={videoSrc}
                                    poster={slide.poster || heroPoster}
                                    preload="metadata"
                                    loop={index !== slides.length - 1} // Loop all except the last one
                                    muted
                                    playsInline
                                    onEnded={() => {
                                        if (index === slides.length - 1) {
                                            nextSlide();
                                        }
                                    }}
                                    ref={el => (videoRefs.current[index] = el)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: `url(${slide.customMediaUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Dark Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, rgba(5, 16, 32, 0.7) 0%, rgba(5, 16, 32, 0.5) 40%, rgba(5, 16, 32, 0.2) 100%)',
                zIndex: 2
            }} />

            {/* Content Card */}
            <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="hero-content-card"
                >
                    {/* Subtle Internal Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 60%)',
                        pointerEvents: 'none'
                    }} />

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            <span className="hero-category">
                                IT Services & Consulting
                            </span>

                            <h2 className="hero-title">
                                {currentSlide.title}
                            </h2>

                            <p className="hero-subtitle">
                                {currentSlide.subtitle}
                            </p>

                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="btn hero-cta"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    border: '1px solid #D4AF37',
                                    color: '#D4AF37',
                                    padding: '16px 40px',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    backdropFilter: 'blur(5px)',
                                    transition: 'all 0.3s ease',
                                    fontFamily: "'Outfit', sans-serif"
                                }}
                            >
                                {currentSlide.cta}
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <ArrowRight size={22} />
                                </motion.span>
                            </motion.a>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Controls */}
            {slides.length > 1 && (
                <div className="hero-controls" style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 20, display: 'flex', gap: '10px' }}>
                    <button onClick={prevSlide} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(5px)' }}>
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextSlide} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(5px)' }}>
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            {/* Indicators */}
            {slides.length > 1 && (
                <div className="hero-indicators" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: '8px' }}>
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            style={{
                                width: idx === current ? '30px' : '10px',
                                height: '4px',
                                background: idx === current ? 'var(--color-gold-primary)' : 'rgba(255,255,255,0.3)',
                                borderRadius: '2px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroVideo;
