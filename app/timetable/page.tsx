// page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

import TabDays from './components/TabDays';
import TimeColumn from './components/TimeColumn';
import EventGrid from './components/EventGrid';
import {
    loadData,
    getEventsForDate,
    addEvent,
    updateEvent,
    deleteEvent,
    updateSelectedDate,
    Event,
    TimetableData,
} from './data/localStore';
import { getWeekDates } from './utils/timeUtils';

const VENUE_WIDTH = 200;

export default function TimetablePage() {
    const [data, setData] = useState<TimetableData | null>(null);
    const [weekDates, setWeekDates] = useState<Array<{ day: string; date: string; fullDate: string }>>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        venue: '',
        startTime: '',
        endTime: '',
    });

    // Load data on mount
    useEffect(() => {
        const loadedData = loadData();
        setData(loadedData);
        setWeekDates(getWeekDates());
    }, []);

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    const currentEvents = getEventsForDate(data, data.selectedDate);

    const handleDateChange = (date: string) => {
        const newData = updateSelectedDate(data, date);
        setData(newData);
    };

    const handleEventClick = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            venue: event.venue,
            startTime: event.startTime,
            endTime: event.endTime,
        });
        setIsDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingEvent(null);
        setFormData({
            title: '',
            venue: data.venues[0] || '',
            startTime: '09:00',
            endTime: '10:00',
        });
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.venue || !formData.startTime || !formData.endTime) {
            toast.info('Please fill in all fields');
            return;
        }

        if (formData.startTime >= formData.endTime) {
            toast.info('End time must be after start time');
            return;
        }

        let newData: TimetableData;

        if (editingEvent) {
            // Update existing event
            const updatedEventData: Event = {
                ...editingEvent,
                title: formData.title,
                venue: formData.venue,
                startTime: formData.startTime,
                endTime: formData.endTime,
            };
            newData = updateEvent(data, editingEvent.id, updatedEventData, data.selectedDate);
        } else {
            // Add new event
            const newEventData: Event = {
                id: Date.now().toString(),
                title: formData.title,
                venue: formData.venue,
                startTime: formData.startTime,
                endTime: formData.endTime,
            };
            newData = addEvent(data, newEventData, data.selectedDate);
        }

        setData(newData);
        setIsDialogOpen(false);
        setEditingEvent(null);
    };

    const handleConfirmDelete = () => {
        if (!editingEvent) return;
        const newData = deleteEvent(data, editingEvent.id, data.selectedDate);
        setData(newData);
        setIsDialogOpen(false);
        setEditingEvent(null);
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Event Timetable</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your events and schedules</p>
                </div>
                <Button onClick={handleAddNew} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Event
                </Button>
            </div>

            {/* Day Tabs */}
            <TabDays
                weekDates={weekDates}
                selectedDate={data.selectedDate}
                onDateChange={handleDateChange}
            />

            {/* Main Timetable Grid */}
            <div className="flex-1 flex overflow-hidden">
                <TimeColumn />
                <EventGrid
                    venues={data.venues}
                    events={currentEvents}
                    venueWidth={VENUE_WIDTH}
                    onEventClick={handleEventClick}
                />
            </div>

            {/* Event Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                        <DialogDescription>
                            {editingEvent ? 'Update the event details below.' : 'Fill in the details to create a new event.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Event Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., Morning Keynote"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="venue">Venue</Label>
                            <select
                                id="venue"
                                value={formData.venue}
                                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                {data.venues.map((venue) => (
                                    <option key={venue} value={venue}>
                                        {venue}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="startTime">Start Time</Label>
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="endTime">End Time</Label>
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        {editingEvent && (
                            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="gap-2 mr-auto"
                                        onClick={() => setIsDeleteDialogOpen(true)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. Do you really want to delete this event?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="button" onClick={handleSave}>
                            {editingEvent ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
