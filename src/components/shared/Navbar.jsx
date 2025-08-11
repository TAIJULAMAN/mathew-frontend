import React from "react";
import { useState, useEffect } from "react";

import { FaChevronDown, FaWarehouse } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import ContactModal from "./common/ContactModal";

import { Link } from "react-router-dom";
import { useGetClientPortalQuery } from "../../redux/api/clientPortalApi";


export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { data: clientPortalData } = useGetClientPortalQuery({});
    const portal = clientPortalData?.data?.[0];
    console.log(portal)
    // console.log("Client Portal Data:", portal);

    // Scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDesktopMouseEnter = () => setIsDesktopDropdownOpen(true);
    const handleDesktopMouseLeave = () => setIsDesktopDropdownOpen(false);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 px-5 py-2 transition-all duration-300 overflow-hidden ${isScrolled
                ? 'bg-white/10 backdrop-blur-md shadow-lg'
                : 'bg-white'
                }`}>
                {/* Navigation Content */}
                <div className="relative z-10 container mx-auto">
                    <div className="flex items-center justify-between w-full">
                        {/* Left: Logo */}
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="cursor-pointer">
                                <img
                                    className="w-[50px] h-[50px] object-contain"
                                    src="/logoff.png"
                                    alt="company Logo"
                                />
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                Rapid Flow Fulfillment
                            </p>

                        </Link>

                        {/* Center: Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8 justify-center flex-1">
                            <Link
                                to="/"
                                className="text-gray-900 hover:text-red-600 font-bold transition-all duration-300 relative group px-3 py-2"
                            >
                                <span className="relative z-10">Home</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>

                            {/* Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={handleDesktopMouseEnter}
                                onMouseLeave={handleDesktopMouseLeave}
                            >
                                <DropdownMenu
                                    open={isDesktopDropdownOpen}
                                    onOpenChange={setIsDesktopDropdownOpen}
                                >
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center border-none space-x-1 text-gray-900 hover:text-red-600 font-bold transition-all duration-300 relative group px-3 py-2 rounded-lg">
                                            <Link to="/about">
                                                <span className="relative z-10">About</span>
                                            </Link>
                                            <FaChevronDown
                                                className={`w-4 h-4 transition-all duration-300 relative z-10 ${isDesktopDropdownOpen
                                                    ? "rotate-180 text-red-400"
                                                    : "rotate-0"
                                                    }`}
                                            />
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="start"
                                        className="w-[320px] bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300"
                                    >
                                        {[
                                            {
                                                href: "/about#our-process",
                                                icon: <IoSettingsSharp className="w-5 h-5 text-white" />,
                                                title: "Our Process",
                                                desc: "Streamlined from start to finish.",
                                            },
                                            {
                                                href: "/about#our-services",
                                                icon: <FaWarehouse className="w-5 h-5 text-white" />,
                                                title: " Our Services",
                                                desc: "Built for every channel.",
                                            },
                                            {
                                                href: "/about#our-mission",
                                                icon: <TbTargetArrow className="w-5 h-5 text-white" />,
                                                title: "Our Mission",
                                                desc: "Simplifying fulfillment.",
                                            },
                                        ].map((item, idx) => (
                                            <DropdownMenuItem asChild key={idx}>
                                                <a
                                                    href={item.href}
                                                    className="p-4 rounded-lg hover:bg-red-500/20 transition-all duration-300 flex items-start space-x-3 group"
                                                >
                                                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                                            {item.desc}
                                                        </div>
                                                    </div>
                                                </a>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>



                            <Link
                                to="/testimonial"
                                className="text-gray-900 hover:text-red-600 font-bold transition-all duration-300 relative group px-3 py-2"
                            >
                                <span className="relative z-10">Testimonials</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <Link
                                to="/faq"
                                className="text-gray-900 hover:text-red-600 font-bold transition-all duration-300 relative group px-3 py-2"
                            >
                                <span className="relative z-10">FAQ</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </div>

                        {/* Right: Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href={
                                    portal?.link
                                        ? portal?.link
                                        : "https://rapidflowfulfillment.com"
                                }
                                // href="https://rapidflowfulfillment.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-100/80 hover:bg-gray-200/80 text-gray-900 hover:text-red-600 font-bold px-6 py-2 rounded-lg transition-all duration-300 border border-gray-300/50 hover:border-red-400/50 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
                            >
                                {portal?.name || "Client Portal"}
                            </a>

                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105 border border-red-400/50 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get in touch
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-gray-300/50 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6 text-gray-900" />
                            ) : (
                                <MdOutlineMenu className="w-6 h-6 text-gray-900" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-6 pt-6 border-t border-gray-300/50 animate-in fade-in-0 slide-in-from-top-2 duration-300 bg-white">
                            <div className="flex flex-col space-y-4">
                                <Link
                                    to="/"
                                    className="text-gray-900 hover:text-red-600 font-bold transition-all duration-300 p-3 rounded-lg hover:bg-white/20"
                                >
                                    Home
                                </Link>

                                <DropdownMenu
                                    open={isMobileDropdownOpen}
                                    onOpenChange={setIsMobileDropdownOpen}
                                >
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center border-none justify-between text-gray-900 hover:text-red-600 font-bold transition-all duration-300 w-full text-left p-3 rounded-lg hover:bg-white/20">
                                            <Link to="/about">About</Link>
                                            <FaChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${isMobileDropdownOpen ? "rotate-180" : "rotate-0"
                                                    }`}
                                            />
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="start"
                                        className="w-64 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300"
                                    >
                                        {[
                                            { href: "/about#our-process", label: "Our Process" },
                                            { href: "/about#our-services", label: " Our Services" },
                                            { href: "/about#our-mission", label: "Our Mission" },
                                        ].map((item, idx) => (
                                            <DropdownMenuItem asChild key={idx}>
                                                <a
                                                    href={item.href}
                                                    className="w-full transition-all duration-300 block px-4 py-3 text-gray-900 hover:text-red-600 hover:bg-red-500/20 rounded-lg"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {item.label}
                                                </a>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Link
                                    to="/testimonial"
                                    className="text-gray-900 hover:text-red-600 font-bold transition-all duration-300 p-3 rounded-lg hover:bg-white/20"
                                >
                                    Testimonials
                                </Link>
                                <Link
                                    to="/faq"
                                    className="text-gray-900 hover:text-red-600 font-bold transition-all duration-300 p-3 rounded-lg hover:bg-white/20"
                                >
                                    FAQ
                                </Link>

                                <div className="py-4 border-t border-gray-300/50 space-y-3">
                                    <a
                                        href={
                                            portal?.link
                                                ? portal?.link
                                                : "https://rapidflowfulfillment.com"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-gray-900 hover:text-red-600 font-bold transition-all duration-300 p-3 rounded-lg hover:bg-white/20"
                                    >
                                        Client portal
                                    </a>

                                    <div className="mx-5">
                                        <Button
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold  px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 border border-red-400/50 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Get in touch
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contact Modal */}
                {/* <ContactModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                /> */}
            </nav>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="h-[60px]"></div>
        </>
    );
}
