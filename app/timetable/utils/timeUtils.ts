/**
 * Convert time string "HH:MM" to total minutes from midnight
 */
export function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

/**
 * Convert minutes to time string "HH:MM"
 */
export function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Calculate duration in minutes between start and end time
 */
export function calculateDuration(startTime: string, endTime: string): number {
    return timeToMinutes(endTime) - timeToMinutes(startTime);
}

/**
 * Calculate pixel height based on duration
 * 15 minutes = 20px
 */
export function durationToPixels(duration: number): number {
    return (duration / 15) * 20;
}

/**
 * Calculate vertical offset in pixels based on start time
 */
export function timeToPixelOffset(time: string): number {
    const minutes = timeToMinutes(time);
    return (minutes / 15) * 20;
}

/**
 * Generate time slots for the day (every 15 minutes)
 */
export function generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            slots.push(minutesToTime(hour * 60 + minute));
        }
    }
    return slots;
}

/**
 * Format time to 12-hour format with AM/PM
 */
export function formatTime12Hour(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Get dates for the current week (Mon-Sun)
 */
export function getWeekDates(baseDate: Date = new Date()): Array<{ day: string; date: string; fullDate: string }> {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];

    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const currentDay = baseDate.getDay();

    // Calculate offset to Monday (1)
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    // Start from Monday
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() + mondayOffset);

    // Generate 7 days starting from Monday
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);

        const dayName = days[date.getDay()];
        const dateNum = date.getDate();
        const fullDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

        result.push({
            day: dayName,
            date: dateNum.toString(),
            fullDate
        });
    }

    return result;
}
