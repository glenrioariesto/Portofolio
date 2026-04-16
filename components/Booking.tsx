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
                <h2 className="text-3xl md:text-7xl font-bold text-amber-900 tracking-tighter font-grotesk">
                    Ready to scale?
                </h2>
                <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Book a free consultation session to discuss your next big project, 
                    refined with technical excellence.
                </p>
            </div>

            <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-white flex flex-col lg:flex-row min-h-[600px] text-slate-900 font-grotesk">
                {/* Left Side: Details */}
                <div className="lg:w-1/3 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-200/50 space-y-8 bg-slate-50/30">
                    <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">Available Slot</span>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900">Project Strategy</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            Detailed technical strategy, architecture review, and roadmap definition for your digital products.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center gap-4 text-slate-600">
                            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Clock size={20} className="text-primary" />
                            </div>
                            <span className="font-medium text-sm">45 Minutes session</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-600">
                            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Video size={20} className="text-primary" />
                            </div>
                            <span className="font-medium text-sm">Remote via Google Meet</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-600">
                            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Globe size={20} className="text-primary" />
                            </div>
                            <span className="font-medium text-sm">Asia/Jakarta (GMT+7)</span>
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 p-6 rounded-3xl mt-auto">
                        <p className="text-primary/80 text-sm italic leading-relaxed">
                            "The consultation helped us identify critical performance bottlenecks before launch."
                        </p>
                    </div>
                </div>

                {/* Center: Calendar */}
                <div className="flex-1 p-8 lg:p-12 space-y-10 bg-white/40">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                             April <span className="text-slate-400 font-medium">2026</span>
                        </h4>
                        <div className="flex gap-2">
                            <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 bg-white">
                                <ChevronLeft size={18} className="text-slate-600" />
                            </button>
                            <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 bg-white">
                                <ChevronRight size={18} className="text-slate-600" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-3 mb-4">
                        {days.map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">
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
                                        transition-all duration-300 relative group border
                                        ${isAvailable ? 'hover:bg-primary/10 hover:border-primary/30 border-slate-100 bg-white cursor-pointer text-slate-700' : 'text-slate-300 border-transparent cursor-not-allowed opacity-40'}
                                        ${isSelected ? 'bg-primary text-white !opacity-100 border-primary shadow-lg shadow-primary/20 scale-105' : ''}
                                    `}
                                >
                                    {day}
                                    {isAvailable && !isSelected && (
                                        <div className="absolute bottom-2 w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-slate-400 text-xs flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-primary" />
                            All times are in GMT+7
                        </p>
                        <span className="text-slate-500 text-xs font-bold hover:text-primary transition-colors cursor-pointer underline underline-offset-4">
                            Sync to calendar
                        </span>
                    </div>
                </div>

                {/* Right Side: Time Slots */}
                <div className="lg:w-1/4 p-8 lg:p-12 bg-slate-50/50 backdrop-blur-md border-l border-slate-100 space-y-8">
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg text-slate-900">Preferred Time</h4>
                        <p className="text-slate-500 text-xs font-medium bg-white py-1 px-3 rounded-md w-fit whitespace-nowrap border border-slate-100 shadow-sm">
                           📅 Thursday, Apr {selectedDate}
                        </p>
                    </div>

                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                        {timeSlots.map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                    w-full py-5 px-6 rounded-2xl text-sm font-bold border transition-all duration-300
                                    ${selectedTime === time 
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                                        : 'bg-white border-slate-100 hover:border-primary/30 hover:bg-primary/5 text-slate-500 shadow-sm'}
                                `}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    {selectedTime && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full py-5 bg-gradient-to-r from-primary-variant to-primary text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
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
                    background: rgba(180, 83, 9, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
};

export default Booking;
