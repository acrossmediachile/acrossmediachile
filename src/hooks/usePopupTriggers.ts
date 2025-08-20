import { useState, useEffect } from 'react';

interface PopupState {
  newsletter: boolean;
  audit: boolean;
  whatsapp: boolean;
  exitIntent: boolean;
}

interface PopupSettings {
  timeDelay: number; // milliseconds
  scrollDepth: number; // percentage
  enableExitIntent: boolean;
  whatsappDelay: number; // milliseconds
}

export const usePopupTriggers = (settings: PopupSettings = {
  timeDelay: 30000, // 30 seconds
  scrollDepth: 50, // 50% scroll
  enableExitIntent: true,
  whatsappDelay: 60000 // 60 seconds
}) => {
  const [popups, setPopups] = useState<PopupState>({
    newsletter: false,
    audit: false,
    whatsapp: false,
    exitIntent: false
  });

  const [triggered, setTriggered] = useState({
    timeDelay: false,
    scrollDepth: false,
    exitIntent: false,
    whatsapp: false
  });

  // Time-based popup (newsletter)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!triggered.timeDelay) {
        setPopups(prev => ({ ...prev, newsletter: true }));
        setTriggered(prev => ({ ...prev, timeDelay: true }));
      }
    }, settings.timeDelay);

    return () => clearTimeout(timer);
  }, [settings.timeDelay, triggered.timeDelay]);

  // WhatsApp popup delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!triggered.whatsapp) {
        setPopups(prev => ({ ...prev, whatsapp: true }));
        setTriggered(prev => ({ ...prev, whatsapp: true }));
      }
    }, settings.whatsappDelay);

    return () => clearTimeout(timer);
  }, [settings.whatsappDelay, triggered.whatsapp]);

  // Scroll-based popup (audit)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= settings.scrollDepth && !triggered.scrollDepth) {
        setPopups(prev => ({ ...prev, audit: true }));
        setTriggered(prev => ({ ...prev, scrollDepth: true }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [settings.scrollDepth, triggered.scrollDepth]);

  // Exit intent popup
  useEffect(() => {
    if (!settings.enableExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered.exitIntent) {
        setPopups(prev => ({ ...prev, exitIntent: true }));
        setTriggered(prev => ({ ...prev, exitIntent: true }));
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [settings.enableExitIntent, triggered.exitIntent]);

  const closePopup = (type: keyof PopupState) => {
    setPopups(prev => ({ ...prev, [type]: false }));
  };

  const openPopup = (type: keyof PopupState) => {
    setPopups(prev => ({ ...prev, [type]: true }));
  };

  return {
    popups,
    closePopup,
    openPopup,
    triggered
  };
};