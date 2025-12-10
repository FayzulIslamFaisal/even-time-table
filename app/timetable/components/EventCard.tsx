import { Event } from '../data/localStore';
import { timeToPixelOffset, durationToPixels, calculateDuration, formatTime12Hour } from '../utils/timeUtils';

interface EventCardProps {
    event: Event;
    venueIndex: number;
    venueWidth: number;
    onClick?: () => void;
}

export default function EventCard({ event, venueIndex, venueWidth, onClick }: EventCardProps) {
    const duration = calculateDuration(event.startTime, event.endTime);
    const height = durationToPixels(duration);
    const top = timeToPixelOffset(event.startTime);
    const left = venueIndex * venueWidth;

    // Color variations for different events
    const colors = [
        'bg-blue-500 border-blue-600',
        'bg-purple-500 border-purple-600',
        'bg-green-500 border-green-600',
        'bg-orange-500 border-orange-600',
        'bg-pink-500 border-pink-600',
        'bg-teal-500 border-teal-600',
    ];

    const colorIndex = parseInt(event.id) % colors.length;
    const colorClass = colors[colorIndex];

    return (
        <div
            className={`absolute ${colorClass} border-l-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transition-shadow`}
            style={{
                top: `${top}px`,
                left: `${left}px`,
                width: `${venueWidth - 8}px`,
                height: `${height}px`,
                minHeight: '70px'
            }}
            onClick={onClick}
        >
            <div className="text-white px-2 py-1">
                <h3 className="font-semibold text-sm truncate">{event.title}</h3>
                <p className="text-xs opacity-90 mt-1">
                    {formatTime12Hour(event.startTime)} - {formatTime12Hour(event.endTime)}
                </p>
                <p className="text-xs opacity-80 mt-0.5 truncate">{event.venue}</p>
            </div>
        </div>
    );
}
