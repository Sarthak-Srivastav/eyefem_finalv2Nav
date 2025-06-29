import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CustomWhatsAppWidgetProps {
  doctorName: string;
  phoneNumber: string;
  imageUrl?: string;
}

// Regular size WhatsApp icon for the chat button
const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    fill="#ffffff"
    height={size}
    width={size}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="-126.28 -126.28 560.56 560.56"
    xmlSpace="preserve"
    stroke="#ffffff"
    strokeWidth="0.0030800000000000003"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
      <rect x="-126.28" y="-126.28" width="560.56" height="560.56" rx="280.28" fill="#2c823f" strokeWidth="0"></rect>
    </g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.616"></g>
    <g id="SVGRepo_iconCarrier">
      <g id="XMLID_468_">
        <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path>
        <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path>
      </g>
    </g>
  </svg>
);

const CustomWhatsAppWidget: React.FC<CustomWhatsAppWidgetProps> = ({
  doctorName,
  phoneNumber,
  imageUrl = "https://pqkhtgdmgnneooleniis.supabase.co/storage/v1/object/public/website-images/whatsapp%20widget/NISHA.png",
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      // Show typing animation first
      setShowTyping(true);
      // After 2 seconds, hide typing and show message
      const typingTimeout = setTimeout(() => {
        setShowTyping(false);
        setShowMessage(true);
      }, 2000);
      return () => clearTimeout(typingTimeout);
    } else {
      setShowMessage(false);
      setShowTyping(false);
    }
  }, [isExpanded]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      {/* Full Widget */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-[20px] shadow-xl overflow-hidden w-[300px] md:w-[320px] max-w-[calc(100vw-32px)]">
          {/* Header */}
          <div className="bg-[#2c823f] px-4 py-3.5 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={doctorName}
                  className="w-[52px] h-[52px] rounded-full object-cover border-[1.5px] border-white"
                />
                <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-[1.5px] border-white"></div>
              </div>
              <div className="text-white">
                <h3 className="font-medium text-[15px] leading-tight">{doctorName}</h3>
                <p className="text-[13px] leading-tight opacity-90">Online</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors p-1.5"
            >
              <X size={16} />
            </button>
          </div>

          {/* Message Area */}
          <div className="p-4 bg-[#f0f2f5]">
            {showTyping && (
              <div className="bg-[#2c823f] text-white px-4 py-3 rounded-[15px] inline-block max-w-[85%]">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            {showMessage && (
              <>
                <div className="bg-[#2c823f] text-white px-4 py-3 rounded-[15px] inline-block max-w-[85%] text-[14px] leading-[1.4]">
                  Hello! This is Dr. {doctorName.split(" ")[1]} from Eyefem.
                  <br />
                  Hope you're doing well. Please feel free to share your
                  query—I'll be happy to assist you
                </div>
                <div className="text-xs text-gray-500 mt-1.5 ml-1">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </>
            )}
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-[#2c823f] text-white py-3.5 flex items-center justify-center gap-3 hover:bg-[#2c823f] transition-colors text-[15px] font-medium"
          >
            <WhatsAppIcon size={36} />
            Chat on WhatsApp
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-[60px] h-[60px] rounded-full bg-[#2c823f] shadow-xl flex items-center justify-center hover:bg-[#2c823f] transition-colors relative"
        aria-label="Open WhatsApp chat"
      >
        <div className="w-[50px] h-[50px]">
          <WhatsAppIcon size={50} />
        </div>
      </button>
    </div>
  );
};

export default CustomWhatsAppWidget;
