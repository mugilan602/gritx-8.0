import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force scroll to top when the route changes
        // This handles various scroll libraries and browser behaviors

        const scrollToTop = () => {
            // Method 1: Standard window scroll (immediate)
            window.scrollTo(0, 0);

            // Method 2: Reset document element scroll
            if (document.documentElement) {
                document.documentElement.scrollTop = 0;
            }

            // Method 3: Reset body scroll
            if (document.body) {
                document.body.scrollTop = 0;
            }

            // Method 4: Handle Lenis smooth scroll library if it exists
            // Lenis might override scroll behavior, so we reset it
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
        };

        // Execute immediately
        scrollToTop();

        // Use requestAnimationFrame to ensure it happens after render
        requestAnimationFrame(() => {
            scrollToTop();
        });

        // Additional timeout for stubborn cases (like Lenis)
        setTimeout(() => {
            scrollToTop();
        }, 10);

        // Final fallback
        setTimeout(() => {
            scrollToTop();
        }, 100);

    }, [pathname]);

    return null; // This component doesn't render anything
};

export default ScrollToTop;