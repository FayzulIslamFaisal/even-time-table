export interface Event {
    id: string;
    title: string;
    venue: string;
    startTime: string; // "HH:MM" format
    endTime: string;   // "HH:MM" format
}

export interface TimetableData {
    selectedDate: string; // "YYYY-MM-DD" format
    venues: string[];
    events: {
        [date: string]: Event[];
    };
}

const STORAGE_KEY = 'event-timetable-data';

/**
 * Get initial dummy data
 */
function getInitialData(): TimetableData {
    const today = new Date().toISOString().split('T')[0];

    return {
        selectedDate: today,
        venues: ['Hall A', 'Hall B', 'Hall C', 'Hall D'],
        events: {
            [today]: [
                {
                    id: '1',
                    title: 'Morning Keynote',
                    venue: 'Hall A',
                    startTime: '09:00',
                    endTime: '10:30'
                },
                {
                    id: '2',
                    title: 'Workshop: React Basics',
                    venue: 'Hall B',
                    startTime: '09:00',
                    endTime: '11:00'
                },
                {
                    id: '3',
                    title: 'Coffee Break',
                    venue: 'Hall A',
                    startTime: '10:30',
                    endTime: '11:00'
                },
                {
                    id: '4',
                    title: 'Panel Discussion',
                    venue: 'Hall C',
                    startTime: '11:00',
                    endTime: '12:30'
                },
                {
                    id: '5',
                    title: 'Lunch Break',
                    venue: 'Hall A',
                    startTime: '12:30',
                    endTime: '13:30'
                },
                {
                    id: '6',
                    title: 'Advanced Next.js',
                    venue: 'Hall B',
                    startTime: '13:30',
                    endTime: '15:00'
                },
                {
                    id: '7',
                    title: 'UI/UX Workshop',
                    venue: 'Hall D',
                    startTime: '14:00',
                    endTime: '16:00'
                },
                {
                    id: '8',
                    title: 'Networking Session',
                    venue: 'Hall C',
                    startTime: '15:00',
                    endTime: '16:30'
                }
            ]
        }
    };
}

/**
 * Load data from localStorage
 */
export function loadData(): TimetableData {
    if (typeof window === 'undefined') {
        return getInitialData();
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading data from localStorage:', error);
    }

    // If no data exists, initialize with dummy data
    const initialData = getInitialData();
    saveData(initialData);
    return initialData;
}

/**
 * Save data to localStorage
 */
export function saveData(data: TimetableData): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}

/**
 * Get events for a specific date
 */
export function getEventsForDate(data: TimetableData, date: string): Event[] {
    return data.events[date] || [];
}

/**
 * Add a new event
 */
export function addEvent(data: TimetableData, event: Event, date: string): TimetableData {
    const newData = { ...data };

    if (!newData.events[date]) {
        newData.events[date] = [];
    }

    newData.events[date] = [...newData.events[date], event];
    saveData(newData);

    return newData;
}

/**
 * Update an existing event
 */
export function updateEvent(data: TimetableData, eventId: string, updatedEvent: Event, date: string): TimetableData {
    const newData = { ...data };

    if (newData.events[date]) {
        newData.events[date] = newData.events[date].map(event =>
            event.id === eventId ? updatedEvent : event
        );
    }

    saveData(newData);
    return newData;
}

/**
 * Delete an event
 */
export function deleteEvent(data: TimetableData, eventId: string, date: string): TimetableData {
    const newData = { ...data };

    if (newData.events[date]) {
        newData.events[date] = newData.events[date].filter(event => event.id !== eventId);
    }

    saveData(newData);
    return newData;
}

/**
 * Update selected date
 */
export function updateSelectedDate(data: TimetableData, date: string): TimetableData {
    const newData = { ...data, selectedDate: date };
    saveData(newData);
    return newData;
}

/**
 * Add a new venue
 */
export function addVenue(data: TimetableData, venueName: string): TimetableData {
    const newData = {
        ...data,
        venues: [...data.venues, venueName]
    };
    saveData(newData);
    return newData;
}
