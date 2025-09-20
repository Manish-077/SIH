import React from 'react';
// We'll use the useLocation hook to detect the current route
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    // useLocation() gives us information about the current URL
    const location = useLocation();

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/farmers', label: 'Farmers' },
        { href: '/analytics', label: 'Analytics' },
        { href: '/data', label: 'Data Management' },
    ];

    return (
        <div className="w-60 border-r border-gray-200 bg-white p-5">
            <nav>
                <ul>
                    {navLinks.map((link) => {
                        // The link is active if its 'href' matches the current URL's pathname
                        const isActive = location.pathname === link.href;

                        return (
                            <li key={link.href} className="mb-2">
                                {/* The Link component now handles everything, no more onClick on the li */}
                                <Link
                                    to={link.href}
                                    className={`
                                        block w-full rounded p-3 font-medium transition-colors
                                        ${isActive
                                            ? 'bg-gray-800 text-white' // Active state styles
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' // Inactive and hover styles
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
