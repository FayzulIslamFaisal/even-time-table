// components/TimeColumn.tsx
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateTimeSlots, formatTime12Hour } from '../utils/timeUtils';

export default function TimeColumn() {
    const timeSlots = generateTimeSlots();

    return (
        <div className="sticky left-0 z-20 bg-white border-r border-gray-200">
            <div className="w-30 shrink-0">
                <div className="h-12 border-b border-gray-200 bg-gray-50" />
                <ScrollArea className="h-[calc(100vh-48px)]">
                    <div className="relative">
                        {timeSlots.map((time) => (
                            <div
                                key={time}
                                className="border-b border-gray-300 py-4 text-base bg-gray-100 text-black px-2 flex items-center justify-center"
                                style={{ height: '20px' }}
                            >
                                <span className="font-medium">{formatTime12Hour(time)}</span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
