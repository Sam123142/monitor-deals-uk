'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Scale, Menu, X, Search } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { createPortal } from 'react-dom';

function SearchField({ className, onSearch }: { className?: string; onSearch?: () => void }) {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleClear = () => {
        setValue('');
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onSearch?.();
            router.push(`/deals?q=${encodeURIComponent(value.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`relative group w-full ${className}`}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-purple-500 pointer-events-none z-10">
                <Search className="h-4 w-4" />
            </div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search monitors..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-12 md:h-11 pl-11 pr-10 rounded-xl border border-gray-200 bg-gray-50/50 text-sm transition-all duration-200 ease-out
                           dark:border-white/10 dark:bg-zinc-900/50 dark:text-white
                           placeholder:text-gray-400 placeholder:transition-opacity focus:placeholder:opacity-30
                           hover:bg-white hover:border-gray-300 dark:hover:bg-zinc-800 dark:hover:border-white/20
                           focus:bg-white dark:focus:bg-zinc-800 focus:border-purple-500/40 
                           focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:focus:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                           focus:-translate-y-[1px] md:focus:scale-[1.01]
                           focus:ring-4 focus:ring-purple-500/10 focus-visible:outline-none focus:outline-none"
            />
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${value ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                <button
                    type="button"
                    onClick={handleClear}
                    className="active-press p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-zinc-800 transition-all duration-150"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </form>
    );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const { compareIds } = useCompare();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/deals', label: 'Deals' },
        { href: '/compare', label: 'Compare', count: compareIds.length },
    ];

    if (!mounted) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none delay-300'
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                className={`absolute inset-y-0 right-0 w-full max-w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-zinc-950 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } border-l border-gray-100 dark:border-zinc-800`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
            >
                <div className="flex h-full flex-col p-6 pt-20">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => {
                            if (link.href === '/compare' && (link.count || 0) < 1) return null;

                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onClose}
                                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${isActive
                                        ? 'bg-purple-600/10 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 font-bold'
                                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-900'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {link.href === '/compare' && <Scale className="h-5 w-5" />}
                                        <span className="text-lg">{link.label}</span>
                                    </div>
                                    {link.href === '/compare' && link.count && (
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                                            {link.count}
                                        </span>
                                    )}
                                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { compareIds } = useCompare();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none'; // iOS fix
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isMenuOpen]);

    // Close on Esc
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/deals', label: 'Deals' },
        { href: '/compare', label: 'Compare', count: compareIds.length },
    ];

    return (
        <>
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out border-b ${isScrolled
                    ? 'border-gray-200 bg-white shadow-md backdrop-blur-md dark:border-gray-800 dark:bg-black'
                    : 'border-gray-100 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:border-transparent md:bg-white/80 md:backdrop-blur-md md:dark:border-transparent md:dark:bg-black/80'
                    }`}
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="active-press group relative z-[60] transition-all duration-200 ease-out"
                        >
                            <span className="relative inline-block text-xl font-bold bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-[length:200%_auto] bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[position:100%_center] group-hover:brightness-110 group-hover:-translate-y-[1px] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                                MonitorDeals
                                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-purple-500/40 transition-all duration-300 ease-out group-hover:w-full"></span>
                            </span>
                        </Link>

                        {/* Desktop Search */}
                        <div className="hidden flex-1 items-center justify-center px-12 md:flex">
                            <SearchField className="max-w-lg" />
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden items-center gap-6 md:flex">
                            {compareIds.length >= 1 && (
                                <Link
                                    href="/compare"
                                    className="premium-link group flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 opacity-70 transition-all hover:bg-gray-100 hover:opacity-100 dark:bg-zinc-900/50 dark:text-gray-300 dark:hover:bg-zinc-800"
                                >
                                    <Scale className="h-4 w-4" />
                                    <span>Compare</span>
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                                        {compareIds.length}
                                    </span>
                                </Link>
                            )}
                            {navLinks.filter(l => l.href !== '/compare').map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`premium-link rounded-md px-2 py-1 text-sm font-medium transition-colors ${isActive
                                            ? 'text-purple-600 dark:text-purple-400 font-bold'
                                            : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Actions */}
                        <div className="flex items-center gap-1 md:hidden">
                            {compareIds.length >= 1 && (
                                <Link
                                    href="/compare"
                                    className="relative rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
                                    aria-label="View comparison"
                                >
                                    <Scale className="h-6 w-6" />
                                    <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                                        {compareIds.length}
                                    </span>
                                </Link>
                            )}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="relative z-[60] rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 md:hidden"
                                aria-label="Toggle menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Row - Explicitly shown in header on mobile */}
                    <div className="px-4 pb-4 md:hidden">
                        <SearchField onSearch={() => setIsMenuOpen(false)} />
                    </div>
                </div>
            </header>

            {/* Mobile Menu Portal */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
