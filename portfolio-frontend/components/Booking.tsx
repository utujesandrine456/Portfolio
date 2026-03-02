'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar as CalendarIcon,
    Clock,
    Globe,
    User,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Shield,
    Zap,
    MapPin,
    Video
} from 'lucide-react'



const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const TIME_SLOTS = [
    '09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'
]

// --- Utils ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

export default function Booking() {
    const [step, setStep] = useState(1)
    const [selectedDate, setSelectedDate] = useState<number | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [meetingType, setMeetingType] = useState<'online' | 'physical'>('online')
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth])
    const firstDay = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth])

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(prev => prev + 1)
        } else {
            setCurrentMonth(prev => prev + 1)
        }
    }

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(prev => prev - 1)
        } else {
            setCurrentMonth(prev => prev - 1)
        }
    }

    const handleConfirm = () => {
        setStep(3)
        // In a real app, this would send data to a backend or service
    }

    return (
        <section id="booking" className="relative min-h-screen w-full bg-black py-32 overflow-hidden selection:bg-cream/30">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cream/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-px h-[500px] bg-gradient-to-t from-cream/20 to-transparent opacity-20" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cream/20 bg-cream/5 mb-6"
                    >
                        <CalendarIcon size={14} className="text-cream" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream">Schedule a Session</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                        Book a <span className="text-cream">Call</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Whether online or in person — pick a date, choose a time, and let's build something extraordinary together.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Status Panel */}
                        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8">Session Details</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className={`p-3 rounded-xl border transition-all duration-300 ${step >= 1 ? 'border-cream/40 bg-cream/10 text-cream' : 'border-white/5 bg-white/5 text-white/20'}`}>
                                            <CalendarIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Selected Date</p>
                                            <p className={`text-sm font-mono ${selectedDate ? 'text-white' : 'text-white/20'}`}>
                                                {selectedDate ? `${selectedDate} ${MONTHS[currentMonth]} ${currentYear}` : "Not selected yet"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className={`p-3 rounded-xl border transition-all duration-300 ${selectedTime ? 'border-cream/40 bg-cream/10 text-cream' : 'border-white/5 bg-white/5 text-white/20'}`}>
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Selected Time</p>
                                            <p className={`text-sm font-mono ${selectedTime ? 'text-white' : 'text-white/20'}`}>
                                                {selectedTime || "Not selected yet"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className="p-3 rounded-xl border border-cream/40 bg-cream/10 text-cream">
                                            {meetingType === 'online' ? <Video size={18} /> : <MapPin size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Meeting Type</p>
                                            <p className="text-sm font-mono text-white uppercase tracking-tight">
                                                {meetingType === 'online' ? "Video Call" : "In-Person Meeting"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {step === 2 && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={handleConfirm}
                                        disabled={!selectedDate || !selectedTime}
                                        className="w-full mt-10 py-4 bg-cream text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale"
                                    >
                                        Confirm Booking
                                    </motion.button>
                                )}
                            </div>

                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex gap-4 items-start">
                                <Shield size={20} className="text-white/20 shrink-0" />
                                <p className="text-[10px] font-light leading-relaxed text-white/30">
                                    Your details are kept private. You'll receive a confirmation on your preferred channel after booking.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-8 order-1 lg:order-2">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
                                            <button
                                                onClick={() => setMeetingType('online')}
                                                className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${meetingType === 'online' ? 'bg-cream text-black' : 'text-white/40 hover:text-white'}`}
                                            >
                                                Video Call
                                            </button>
                                            <button
                                                onClick={() => setMeetingType('physical')}
                                                className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${meetingType === 'physical' ? 'bg-cream text-black' : 'text-white/40 hover:text-white'}`}
                                            >
                                                In Person
                                            </button>
                                        </div>

                                        <div className="rounded-2xl bg-white/[0.02] overflow-hidden">
                                            <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-0.5">Select Date</p>
                                                    <h4 className="text-base font-bold text-white">
                                                        {MONTHS[currentMonth]} <span className="text-cream/60">{currentYear}</span>
                                                    </h4>
                                                </div>
                                                <div className="flex gap-1.5">
                                                    <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-cream hover:border hover:border-cream/30 transition-all duration-200">
                                                        <ChevronLeft size={16} />
                                                    </button>
                                                    <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-cream hover:border hover:border-cream/30 transition-all duration-200">
                                                        <ChevronRight size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 px-4 pt-4 pb-4">
                                                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
                                                    <div key={i} className={`text-center text-[10px] font-semibold uppercase tracking-widest pb-3 ${i === 5 ? 'text-white/15' : 'text-white/30'}`}>
                                                        {d}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-y-1 px-4 pb-4 justify-items-center">
                                                {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
                                                    <div key={`empty-${i}`} />
                                                ))}
                                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                                    const day = i + 1
                                                    const isSelected = selectedDate === day
                                                    const dow = new Date(currentYear, currentMonth, day).getDay()
                                                    const isSaturday = dow === 6
                                                    const today = new Date()
                                                    const isPast =
                                                        currentYear < today.getFullYear() ||
                                                        (currentYear === today.getFullYear() && currentMonth < today.getMonth()) ||
                                                        (currentYear === today.getFullYear() && currentMonth === today.getMonth() && day < today.getDate())
                                                    const isToday =
                                                        day === today.getDate() &&
                                                        currentMonth === today.getMonth() &&
                                                        currentYear === today.getFullYear()
                                                    const isLocked = isPast || isSaturday

                                                    return (
                                                        <button
                                                            key={day}
                                                            disabled={isLocked}
                                                            onClick={() => { setSelectedDate(day); setStep(2) }}
                                                            className={`
                                                                w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-150
                                                                ${isLocked
                                                                    ? 'text-white/10 cursor-not-allowed'
                                                                    : isSelected
                                                                        ? 'bg-cream text-black font-bold shadow-[0_0_18px_rgba(238,227,203,0.25)]'
                                                                        : isToday
                                                                            ? 'text-cream border border-cream/30 hover:bg-cream/10'
                                                                            : 'text-white/60 hover:border hover:border-white/20 hover:text-white'
                                                                }
                                                            `}
                                                        >
                                                            {day}
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                            {/* Footer note */}
                                            <div className="px-5 py-3 border-t border-white/5 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-white/10 inline-block" />
                                                <span className="text-[9px] text-white/20 uppercase tracking-widest">Saturday — not available</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <button
                                            onClick={() => setStep(1)}
                                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-cream transition-colors"
                                        >
                                            <ChevronLeft size={14} /> Choose a different date
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {TIME_SLOTS.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`p-6 rounded-2xl border font-mono text-xs tracking-widest uppercase transition-all
                                                        ${selectedTime === time
                                                            ? 'bg-cream text-black border-cream shadow-[0_0_20px_rgba(238,227,203,0.2)]'
                                                            : 'bg-white/5 border-white/10 text-white/40 hover:border-cream/40 hover:text-white'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-12 rounded-3xl border border-cream/20 bg-cream/[0.02] text-center"
                                    >
                                        <div className="w-20 h-20 bg-cream/10 text-cream rounded-full flex items-center justify-center mx-auto mb-8 border border-cream/20">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">You're all set.</h3>
                                        <p className="text-white/40 max-w-sm mx-auto text-sm leading-relaxed mb-10">
                                            Your session has been booked for <span className="text-white">{selectedTime}</span> on <span className="text-white">{selectedDate} {MONTHS[currentMonth]}</span>. You'll receive a confirmation shortly.
                                        </p>
                                        <button
                                            onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null) }}
                                            className="text-[10px] font-bold uppercase tracking-[0.4em] text-cream hover:text-white transition-all underline underline-offset-8"
                                        >
                                            Book Another Session
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
