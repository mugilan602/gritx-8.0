import React, { createContext, useRef, useContext } from 'react';

const SectionContext = createContext();

export const useSectionContext = () => useContext(SectionContext);

export const SectionProvider = ({ children }) => {
    const heroSectionRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const footerRef = useRef(null);

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const value = {
        heroSectionRef,
        aboutSectionRef,
        footerRef,
        scrollToSection,
    };

    return (
        <SectionContext.Provider value={value}>
            {children}
        </SectionContext.Provider>
    );
};
