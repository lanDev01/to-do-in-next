'use client';

import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface WeekCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onSelectDate: (date: Date) => void;
}

export function WeekCalendar({
  currentDate,
  selectedDate,
  onPrevWeek,
  onNextWeek,
  onSelectDate
}: WeekCalendarProps) {
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfCurrentWeek, index)
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      setMaxDrag(el.scrollWidth - el.clientWidth);
    }
  }, [weekDays]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 sm:gap-4 mt-10 w-full">
      <div className="w-full flex items-center justify-between">
        <button className="bg-transparent rounded-full" onClick={onPrevWeek}>
          <ArrowLeft size={24} className="text-purple cursor-pointer" />
        </button>

        <h2 className="text-xl text-purple font-light">
          {format(startOfCurrentWeek, 'dd MMM')} - {format(addDays(startOfCurrentWeek, 6), 'dd MMM')}
        </h2>

        <button className="bg-transparent rounded-full" onClick={onNextWeek}>
          <ArrowRight size={24} className="text-purple cursor-pointer" />
        </button>
      </div>

      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0}
        className="flex items-center justify-center gap-2 px-2 w-full scrollbar-hide"
      >
        {weekDays.map((day) => {
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`min-w-[4rem] h-20 p-2 flex flex-col gap-2 items-center justify-center rounded-lg cursor-pointer relative font-semibold
                ${isSelected ? 'border-2 border-purple text-purple' : 'text-white/70'}
              `}
            >
              <span>{format(day, 'EEE')}</span>
              <span>{format(day, 'dd')}</span>

              {isSelected && (
                <div className="absolute -bottom-1.5 w-2.5 h-2.5 rounded-full bg-purple" />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
