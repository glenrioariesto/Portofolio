"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM"
];

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

import { useNavbarContext } from "@/context/NavbarContext";
import { Notification } from "./Notification";

const Booking = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        projectDetails: "",
        projectRepo: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [notification, setNotification] = useState<{
        isOpen: boolean;
        type: 'success' | 'error';
        title: string;
        message: string;
    }>({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    const [viewDate, setViewDate] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();

    const handlePrevMonth = () => {
        setViewDate(new Date(viewYear, viewMonth - 1, 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewYear, viewMonth + 1, 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    const firstDay = getFirstDayOfMonth(viewMonth, viewYear);

    const { isHidden } = useNavbarContext();

    const handleBooking = async () => {
        setIsSubmitting(true);
        try {
            const dateStr = `${viewYear}-${(viewMonth + 1).toString().padStart(2, '0')}-${selectedDate?.toString().padStart(2, '0')}`;
            
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    bookingDate: dateStr,
                    bookingTime: selectedTime
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setFormData({ 
                    clientName: "", 
                    clientEmail: "", 
                    clientPhone: "", 
                    projectDetails: "", 
                    projectRepo: "" 
                });
            } else {
                const errorMessage = result.error?.message || "Something went wrong.";
                setNotification({
                    isOpen: true,
                    type: 'error',
                    title: 'Booking Notice',
                    message: errorMessage
                });
            }
        } catch (error) {
            console.error("Booking error:", error);
            setNotification({
                isOpen: true,
                type: 'error',
                title: 'System Notice',
                message: 'Terjadi gangguan koneksi. Mohon coba lagi beberapa saat lagi.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="booking" className="max-w-[1400px] mx-auto py-32 px-4">
            <motion.div
                animate={{ opacity: isHidden ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4 mb-16"
            >
                <h2 className="text-3xl md:text-7xl font-bold text-amber-900 tracking-tighter font-grotesk">
                    Ready to scale?
                </h2>
                <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Book a free consultation session to discuss your next big project,
                    refined with technical excellence.
                </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6">
                {/* ── Main Booking Card ── */}
                <motion.div
                    animate={{
                        opacity: isHidden ? 0 : 1,
                        scale: isHidden ? 0.95 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ pointerEvents: isHidden ? "none" : "auto" }}
                    className="w-full lg:max-w-[1000px] bg-white/70 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-white flex flex-col lg:flex-row min-h-[640px] text-slate-900 font-grotesk"
                >
                    {/* Left Side: Details */}
                    <div className="lg:w-1/4 p-8 border-b lg:border-b-0 lg:border-r border-slate-200/50 space-y-8 bg-slate-50/30">
                        <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Live Slot</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900">Elite Strategy</h3>
                            <p className="text-slate-500 leading-relaxed text-[11px]">
                                Elite technical strategy & architecture reviews designed to de-risk your MVP and define a clear path to scale.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {[
                                { icon: <Clock size={18} />, text: "30 Min session" },
                                { icon: <Video size={18} />, text: "Google Meet" },
                                { icon: <Globe size={18} />, text: "WIB (GMT+7)" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-600">
                                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-primary">
                                        {item.icon}
                                    </div>
                                    <span className="font-medium text-xs">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-primary/5 border border-primary/10 p-5 rounded-3xl mt-auto hidden lg:block">
                            <p className="text-primary/70 text-[10px] italic leading-relaxed">
                                "From complex chaos to 10x clarity. We acquired the technical confidence to dominate our MVP launch."
                            </p>
                        </div>
                    </div>

                    {/* Center: Calendar */}
                    <div className="flex-1 p-8 lg:p-10 space-y-8 bg-white/40">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                                {monthNames[viewMonth]} <span className="text-slate-400 font-medium">{viewYear}</span>
                            </h4>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handlePrevMonth}
                                    disabled={viewMonth === today.getMonth() && viewYear === today.getFullYear()}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-all border border-slate-100 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button 
                                    onClick={handleNextMonth}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-all border border-slate-100 bg-white text-slate-600"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {days.map(day => (
                                <div key={day} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest pb-2">
                                    {day}
                                </div>
                            ))}
                            {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}

                            {[...Array(daysInMonth)].map((_, i) => {
                                const day = i + 1;
                                const dateObj = new Date(viewYear, viewMonth, day);
                                const isAvailable = dateObj >= today;
                                const isSelected = selectedDate === day;
                                const isRealToday = dateObj.getTime() === today.getTime();

                                return (
                                    <button
                                        key={day}
                                        onClick={() => {
                                            if (isAvailable) {
                                                setSelectedDate(day);
                                                setSelectedTime(null);
                                                setIsSuccess(false);
                                            }
                                        }}
                                        className={`
                                            aspect-square flex items-center justify-center rounded-xl text-sm font-bold
                                            transition-all duration-300 relative group border
                                            ${isSelected
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105 !opacity-100'
                                                : isAvailable
                                                    ? 'hover:bg-primary/10 hover:border-primary/30 border-slate-100 bg-white cursor-pointer text-slate-700'
                                                    : 'text-slate-300 border-transparent cursor-not-allowed opacity-40'}
                                        `}
                                    >
                                        {day}
                                        {isRealToday && !isSelected && (
                                            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side: Quick Time Selection */}
                    <div className="lg:w-1/4 p-8 bg-slate-50/50 backdrop-blur-md border-l border-slate-100 flex flex-col">
                        <AnimatePresence mode="wait">
                            {!selectedDate ? (
                                <motion.div
                                    key="no-date"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-3"
                                >
                                    <div className="p-3 bg-amber-50 rounded-full text-amber-600">
                                        <CalendarIcon size={24} />
                                    </div>
                                    <p className="text-slate-400 text-[10px] font-medium leading-relaxed">
                                        Select a date to view<br />available time slots.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="has-date"
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6 flex-1 flex flex-col pt-2"
                                >
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-sm text-slate-900">Available Times</h4>
                                        <span className="text-[10px] text-primary font-bold">📅 {monthNames[viewMonth]} {selectedDate}, {viewYear}</span>
                                    </div>

                                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => {
                                                    setSelectedTime(time);
                                                    setIsSuccess(false);
                                                }}
                                                className={`
                                                    w-full py-4 px-4 rounded-xl text-xs font-bold border transition-all duration-300
                                                    ${selectedTime === time
                                                        ? 'bg-primary border-primary text-white shadow-md'
                                                        : 'bg-white border-slate-100 hover:border-primary/30 text-slate-500'}
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ── Sidecar Form Card (Expands outside to the right) ── */}
                <AnimatePresence>
                    {selectedTime && (
                        <motion.div
                            initial={{ opacity: 0, x: -30, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: "100%" }}
                            exit={{ opacity: 0, x: -30, width: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full lg:max-w-[300px] shrink-0 lg:sticky lg:top-32"
                        >
                            {!isSuccess ? (
                                <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl border border-white space-y-6 overflow-hidden h-full flex flex-col">
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-bold text-slate-900 font-grotesk">Complete Booking</h4>
                                        <p className="text-slate-500 text-xs">Finalize your {selectedTime} session on {monthNames[viewMonth].substring(0, 3)} {selectedDate}.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Identity</label>
                                            <input
                                                type="text" placeholder="Full Name" required
                                                value={formData.clientName}
                                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Info</label>
                                            <input
                                                type="email" placeholder="Email Address" required
                                                value={formData.clientEmail}
                                                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm focus:outline-none focus:border-primary transition-all mb-3"
                                            />
                                            <input
                                                type="tel" placeholder="WhatsApp / Phone" required
                                                value={formData.clientPhone}
                                                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm focus:outline-none focus:border-primary transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Topic</label>
                                            <textarea
                                                placeholder="What should we discuss?" rows={3}
                                                value={formData.projectDetails}
                                                onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm focus:outline-none focus:border-primary transition-all resize-none"
                                            />
                                            <input 
                                                type="url" placeholder="Repository Link (Optional)"
                                                value={formData.projectRepo}
                                                onChange={(e) => setFormData({ ...formData, projectRepo: e.target.value })}
                                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm focus:outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBooking}
                                        disabled={isSubmitting}
                                        className={`
                                            w-full py-5 text-white font-black rounded-3xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95
                                            ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-variant to-primary shadow-primary/20 hover:shadow-primary/40'}
                                        `}
                                    >
                                        {isSubmitting ? 'Securing Slot...' : 'Confirm Details'}
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-green-500 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl"
                                >
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="font-bold text-2xl">Done!</h5>
                                        <p className="text-white/80 text-sm leading-relaxed">
                                            Session confirmed.<br />A calendar invite was sent to {formData.clientEmail || 'your email'}.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsSuccess(false);
                                            setSelectedTime(null);
                                            setSelectedDate(null);
                                        }}
                                        className="w-full py-4 bg-white text-green-600 rounded-2xl font-bold hover:bg-green-50 transition-colors"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Notification 
                {...notification}
                onClose={() => setNotification(curr => ({ ...curr, isOpen: false }))}
            />

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
