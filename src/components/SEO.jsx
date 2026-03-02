import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website', location }) => {
    const siteTitle = "GOLDTECH IT Solutions";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteDescription = "GOLDTECH: Premium IT consulting, AI automation, Managed Services, and Cloud solutions for global enterprises.";
    const metaDescription = description || siteDescription;
    const siteUrl = "https://www.goldtech.in/";
    const fullUrl = url ? `${siteUrl}${url.startsWith('/') ? url.slice(1) : url}` : siteUrl;

    const defaultKeywords = "GOLDTECH, GoldTech IT Solutions, IT Services India, Managed IT Support New York, Cybersecurity London, Cloud Solutions Dubai, IT Consulting Singapore, AI Automation, Tech Excellence";
    const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    // Organization Schema (Branding & Sitelinks)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "GOLDTECH",
        "legalName": "GOLDTECH IT Solutions",
        "url": siteUrl,
        "logo": `${siteUrl}logo.png`,
        "foundingDate": "2010",
        "description": "Premium software development and IT consulting firm based in Hyderabad, specializing in AI, Cloud, and Fintech infrastructure.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Nanakramguda, Financial District",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500032",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9640786029",
            "contactType": "customer service",
            "areaServed": "Worldwide",
            "availableLanguage": ["en", "telugu", "hindi"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/goldtech-it-solutions"
        ]
    };

    // Site Navigation Element (For Sitelink Generation)
    const navigationSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            { "@type": "SiteNavigationElement", "position": 1, "name": "Services", "url": `${siteUrl}services` },
            { "@type": "SiteNavigationElement", "position": 2, "name": "Industries", "url": `${siteUrl}industries` },
            { "@type": "SiteNavigationElement", "position": 3, "name": "About Us", "url": `${siteUrl}about` },
            { "@type": "SiteNavigationElement", "position": 4, "name": "Careers", "url": `${siteUrl}career` },
            { "@type": "SiteNavigationElement", "position": 5, "name": "Contact", "url": `${siteUrl}contact` }
        ]
    };

    // WebSite Schema (Brand Name)
    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "GOLDTECH",
        "url": siteUrl
    };

    // Breadcrumb Schema
    const breadcrumbData = url ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": title || "Current Page",
                "item": fullUrl
            }
        ]
    } : null;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={fullUrl} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Canonical Link */}
            <link rel="canonical" href={fullUrl} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(navigationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(webSiteSchema)}
            </script>
            {breadcrumbData && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
