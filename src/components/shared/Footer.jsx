import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTiktok,
    FaWhatsapp,
} from "react-icons/fa";
import { useGetContactQuery } from "../../redux/api/contactApi";
import { Link } from "react-router-dom";

export default function Footer() {
    const { data: contactData } = useGetContactQuery()
    // console.log(contactData)

    const footerData = contactData?.data?.[0]
    // console.log(footerData)

    useEffect(() => {
        const checkDeviceType = () => {
            const mobileRegex =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            setIsMobile(mobileRegex.test(navigator.userAgent));
        };
        checkDeviceType();
    }, []);

    const handlePhoneClick = async (e) => {
        console.log("clicked")
        // if (!isMobile) {
        //     e.preventDefault();
        //     try {
        //         await navigator.clipboard.writeText("281-883-6053");
        //         alert("Phone number copied!");
        //     } catch (err) {
        //         console.error("Failed to copy phone number:", err);
        //         const textArea = document.createElement("textarea");
        //         textArea.value = "281-883-6053";
        //         document.body.appendChild(textArea);
        //         textArea.select();
        //         document.execCommand("copy");
        //         document.body.removeChild(textArea);
        //         alert("Phone number copied!");
        //     }
        // }
    };

    const getSocialIcon = (name) => {
        const platformName = name.toLowerCase();
        switch (platformName) {
            case "facebook":
                return <FaFacebook className="w-5 h-5" />;
            case "linkedin":
                return <FaLinkedin className="w-5 h-5" />;
            case "instragram":
                return <FaInstagram className="w-5 h-5" />;
            case "tiktok":
                return <FaTiktok className="w-4 h-4" />;
            default:
                return <FaWhatsapp className="w-5 h-5" />;
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 border-t border-gray-200">
            <div className="container mx-auto">
                {/* Logo Section */}
                <div className="mb-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="relative">
                            <img
                                src="/logoff.png"
                                width={45}
                                height={45}
                                alt="Rapid Flow Fulfillment Logo"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight">
                            Rapid Flow Fulfillment
                        </span>
                    </div>
                    <span className="text-sm italic text-gray-600 ml-14">
                        Effortless Fulfillment. Every Time.
                    </span>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-8 mb-5">
                    {/* About Section */}
                    <div className="space-y-4">
                        <Link to="about">
                            <h3 className="text-red-500 font-bold text-lg mb-4 border-b-2 border-red-100 pb-2">
                                About
                            </h3>
                        </Link>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        to="/about#our-process"
                                        className="text-gray-700 hover:text-red-500 transition-all duration-300 font-medium flex items-center group"
                                    >
                                        Our Process
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about#our-services"
                                        className="text-gray-700 hover:text-red-500 transition-all duration-300 font-medium flex items-center group"
                                    >
                                        Our Services
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about#our-mission"
                                        className="text-gray-700 hover:text-red-500 transition-all duration-300 font-medium flex items-center group"
                                    >
                                        Our Mission
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-red-500 font-bold text-lg mb-4 border-b-2 border-red-100 pb-2">
                            Information
                        </h3>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        to="/faq"
                                        className="text-gray-700 hover:text-red-500 transition-all duration-300 font-medium flex items-center group"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/testimonial"
                                        className="text-gray-700 hover:text-red-500 transition-all duration-300 font-medium flex items-center group"
                                    >
                                        Testimonials
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h3 className="text-red-500 font-bold text-lg mb-4 border-b-2 border-red-100 pb-2">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            {footerData?.location && (
                                <li className="text-gray-700 flex items-start">
                                    <span className="leading-relaxed">
                                        {footerData?.location}
                                    </span>
                                </li>
                            )}
                            {footerData?.email && (
                                <li>
                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${footerData?.email}&su=Support&body=Hello`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-500 hover:text-red-600 transition-colors flex items-center group"
                                    >
                                        {footerData?.email}
                                    </a>
                                </li>
                            )}
                            {footerData?.phone && (
                                <li>
                                    <Link
                                        to={`tel:${footerData?.phone.replace(/\D/g, "")}`}
                                        onClick={handlePhoneClick}
                                        className="text-red-500 hover:text-red-600 transition-colors flex items-center group"
                                    >
                                        {footerData?.phone}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {/* footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-300">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-gray-500 text-sm mb-6 md:mb-0">
                        <img
                            src="/bbb.jpeg"
                            width={80}
                            height={80}
                            alt="BBB Accredited Business"
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        />
                        <div className="text-center md:text-left">
                            Copyright &copy; {new Date().getFullYear()} Rapid Flow Fulfillment
                            <br />
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        {
                            footerData?.socialmedia?.length > 0 && (
                                <div className="flex justify-center items-center gap-4 mb-3">
                                    {footerData?.socialmedia?.map(
                                        (item, index) => (
                                            <a
                                                key={item?.name}
                                                href={item?.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                                                aria-label={`Follow us on ${item?.name}`}
                                            >
                                                <div className="text-gray-600 group-hover:text-red-500 transition-colors duration-300">
                                                    {getSocialIcon(item?.name)}
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                                    {item?.name}
                                                </div>
                                            </a>
                                        )
                                    )}
                                </div>
                            )}
                        <span className="text-sm italic text-gray-600 font-medium">
                            Follow us for updates
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
