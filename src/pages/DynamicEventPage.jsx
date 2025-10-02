import React from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import AnimatedEventPage from '../components/AnimatedEventPage';
import { getEventDataBySlug } from '../data/eventDataLoader';

function DynamicEventPage() {
    const { slug } = useParams();
    const location = useLocation();

    // Get slug from params (for /event/:slug route) or from pathname (for individual routes)
    const eventSlug = slug || location.pathname.substring(1); // Remove leading slash

    // Get event data based on the slug
    const eventData = getEventDataBySlug(eventSlug);

    // If event not found, redirect to events page
    if (!eventData) {
        return <Navigate to="/events" replace />;
    }

    return (
        <div>
            <AnimatedEventPage eventData={eventData} />
        </div>
    );
}

export default DynamicEventPage;