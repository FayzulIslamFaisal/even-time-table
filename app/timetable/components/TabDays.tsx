import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabDaysProps {
    weekDates: Array<{ day: string; date: string; fullDate: string }>;
    selectedDate: string;
    onDateChange: (date: string) => void;
}

export default function TabDays({ weekDates, selectedDate, onDateChange }: TabDaysProps) {
    return (
        <div className="border-b border-gray-200 bg-white shadow-sm">
            <Tabs value={selectedDate} onValueChange={onDateChange} className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-0 bg-transparent rounded-none border-none">
                    {weekDates.map((dateInfo) => {
                        const isSelected = dateInfo.fullDate === selectedDate;

                        return (
                            <TabsTrigger
                                key={dateInfo.fullDate}
                                value={dateInfo.fullDate}
                                className={`
                  flex-shrink-0 px-6 py-4 rounded-none border-b-2 transition-all
                  data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50
                  data-[state=inactive]:border-transparent
                  hover:bg-gray-50
                `}
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <span className={`text-xs font-medium ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {dateInfo.day}
                                    </span>
                                    <span className={`text-lg font-bold ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                                        {dateInfo.date}
                                    </span>
                                </div>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
            </Tabs>
        </div>
    );
}
