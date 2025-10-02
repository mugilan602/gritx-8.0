// Example of how to navigate to events programmatically
import { useNavigate } from 'react-router-dom';
import { eventsData } from '../data/eventsData';

export function EventNavigation() {
    const navigate = useNavigate();

    const handleEventClick = (eventSlug) => {
        navigate(`/${eventSlug}`);
    };

    return (
        <div>
            {eventsData.map(event => (
                <button
                    key={event.id}
                    onClick={() => handleEventClick(event.slug)}
                >
                    Go to {event.title}
                </button>
            ))}
        </div>
    );
}

// Alternative: Using Link components
import { Link } from 'react-router-dom';

export function EventLinks() {
    return (
        <div>
            {eventsData.map(event => (
                <Link
                    key={event.id}
                    to={event.link}
                    className="event-link"
                >
                    {event.title}
                </Link>
            ))}
        </div>
    );
}