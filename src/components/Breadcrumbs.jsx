import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10, position: 'relative' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', hover: { color: '#D4AF37' } }}>
                <Home size={16} />
            </Link>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const displayName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

                return (
                    <React.Fragment key={to}>
                        <ChevronRight size={14} color="rgba(255,255,255,0.4)" />
                        {last ? (
                            <span style={{ color: '#D4AF37', fontWeight: '600' }}>{displayName}</span>
                        ) : (
                            <Link to={to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }}>
                                {displayName}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
