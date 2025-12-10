// components/EventGrid.tsx
import { Event } from '../data/localStore';
import { generateTimeSlots } from '../utils/timeUtils';
import EventCard from './EventCard';
import VenueHeader from './VenueHeader';

interface EventGridProps {
    venues: string[];
    events: Event[];
    venueWidth: number;
    onEventClick: (event: Event) => void;
}

export default function EventGrid({ venues, events, venueWidth, onEventClick }: EventGridProps) {
    const timeSlots = generateTimeSlots();
    const gridHeight = timeSlots.length * 20; // 20px per 15-minute slot

    return (
        <div className="flex-1 overflow-auto">
            <VenueHeader venues={venues} venueWidth={venueWidth} />

            <div className="relative" style={{ height: `${gridHeight}px` }}>
                {/* Background grid */}
                <div className="absolute inset-0 flex">
                    {venues.map((_, venueIndex) => (
                        <div
                            key={venueIndex}
                            className="shrink-0 border-r border-gray-200"
                            style={{ width: `${venueWidth}px` }}
                        >
                            {timeSlots.map((time, timeIndex) => (
                                <div
                                    key={time}
                                    className={`border-b ${timeIndex % 4 === 0 ? 'border-gray-300' : 'border-gray-100'}`}
                                    style={{ height: '20px' }}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Event cards */}
                <div className="absolute inset-0">
                    {events.map((event) => {
                        const venueIndex = venues.indexOf(event.venue);
                        if (venueIndex === -1) return null;

                        return (
                            <EventCard
                                key={event.id}
                                event={event}
                                venueIndex={venueIndex}
                                venueWidth={venueWidth}
                                onClick={() => onEventClick(event)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
