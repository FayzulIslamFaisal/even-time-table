//components/VenueHeader.tsx

interface VenueHeaderProps {
    venues: string[];
    venueWidth: number;
}

export default function VenueHeader({ venues, venueWidth }: VenueHeaderProps) {
    return (
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex">
                {venues.map((venue, index) => (
                    <div
                        key={index}
                        className="shrink-0 h-12 flex items-center justify-center border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white"
                        style={{ width: `${venueWidth}px` }}
                    >
                        <span className="font-semibold text-sm text-gray-700">{venue}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
