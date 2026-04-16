"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Calendar as CalendarIcon, 
    Clock, 
    Video, 
    Globe, 
    ChevronLeft, 
    ChevronRight,
    CheckCircle2
} from "lucide-react";

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:30 AM", 
    "01:00 PM", "02:30 PM", "04:00 PM", "05:15 PM"
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const Booking = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(16);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    return (
        <section id="booking" className="max-w-screen-xl mx-auto py-32 px-4">
            <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl md:text-7xl font-bold text-amber-950 tracking-tighter font-grotesk">
                    Ready to scale?
                </h2>
                <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Book a free consultation session to discuss your next big project, 
                    refined with technical excellence.
                </p>
            </div>

            <div className="bg-[#1E293B] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row min-h-[600px] text-white font-grotesk">
                {/* Left Side: Details */}
                <div className="lg:w-1/3 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 space-y-8">
                    <div className="flex items-center gap-3 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Available Slot</span>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold tracking-tight">Project Strategy</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Detailed technical strategy, architecture review, and roadmap definition for your digital products.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Clock size={20} className="text-amber-500" />
                            </div>
                            <span className="font-medium text-sm">45 Minutes session</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Video size={20} className="text-amber-500" />
                            </div>
                            <span className="font-medium text-sm">Remote via Google Meet</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Globe size={20} className="text-amber-500" />
                            </div>
                            <span className="font-medium text-sm">Asia/Jakarta (GMT+7)</span>
                        </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl mt-auto">
                        <p className="text-amber-100/80 text-sm italic leading-relaxed">
                            "The consultation helped us identify critical performance bottlenecks before launch."
                        </p>
                    </div>
                </div>

                {/* Center: Calendar */}
                <div className="flex-1 p-8 lg:p-12 space-y-10">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold flex items-center gap-2">
                             April <span className="text-slate-500 font-medium">2026</span>
                        </h4>
                        <div className="flex gap-2">
                            <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-white/10">
                                <ChevronLeft size={18} />
                            </button>
                            <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-white/10">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-3 mb-4">
                        {days.map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest pb-4">
                                {day}
                            </div>
                        ))}
                        {[...Array(2)].map((_, i) => <div key={`empty-${i}`} />)}
                        
                        {[...Array(30)].map((_, i) => {
                            const day = i + 1;
                            const isAvailable = day >= 13 && day <= 28;
                            const isSelected = selectedDate === day;

                            return (
                                <button
                                    key={day}
                                    onClick={() => isAvailable && setSelectedDate(day)}
                                    className={`
                                        aspect-square flex items-center justify-center rounded-2xl text-sm font-bold
                                        transition-all duration-300 relative group
                                        ${isAvailable ? 'hover:bg-amber-500 hover:text-white cursor-pointer' : 'text-slate-700 cursor-not-allowed opacity-40'}
                                        ${isSelected ? 'bg-amber-500 text-white !opacity-100 ring-4 ring-amber-500/20' : 'bg-white/5'}
                                    `}
                                >
                                    {day}
                                    {isAvailable && !isSelected && (
                                        <div className="absolute bottom-2 w-1 h-1 rounded-full bg-amber-500/50 group-hover:bg-white transition-colors" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <p className="text-slate-500 text-xs flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-amber-500" />
                            All times are in GMT+7
                        </p>
                        <span className="text-slate-400 text-xs font-bold hover:text-white transition-colors cursor-pointer underline underline-offset-4">
                            Sync to calendar
                        </span>
                    </div>
                </div>

                {/* Right Side: Time Slots */}
                <div className="lg:w-1/4 p-8 lg:p-12 bg-slate-900/50 backdrop-blur-md border-l border-white/5 space-y-8">
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg">Preferred Time</h4>
                        <p className="text-slate-500 text-xs font-medium bg-white/5 py-1 px-3 rounded-md w-fit whitespace-nowrap">
                           📅 Thursday, Apr {selectedDate}
                        </p>
                    </div>

                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                        {timeSlots.map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                    w-full py-5 px-6 rounded-2xl text-sm font-bold border transition-all duration-500
                                    ${selectedTime === time 
                                        ? 'bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-500/20' 
                                        : 'bg-white/5 border-white/5 hover:border-amber-500/30 hover:bg-white/10 text-slate-400'}
                                `}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    {selectedTime && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full py-5 bg-[#B45309] text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-[#92400E] transition-all shadow-2xl shadow-amber-900/20 active:scale-95"
                        >
                            Confirm Booking
                        </motion.button>
                    )}
                </div>
            </div>

            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
};

export default Booking;
