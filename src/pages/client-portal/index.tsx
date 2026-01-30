import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Check, Video, Phone, ChevronRight, ChevronLeft, Clock, User, X, Download, FileText, Trash2, Mail, MessageCircle } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Activity {
    id: string;
    date: string;
    clientName: string;
    company: string;
    phone: string;
    status: string;
}

const ClientPortal = () => {
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        agreePhone: false,
        agreeEmail: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (key: 'agreePhone' | 'agreeEmail') => {
        setFormData(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const [date, setDate] = useState<Date | undefined>(new Date());

    const [activities, setActivities] = useState<Activity[]>(() => {
        const saved = localStorage.getItem('activities');
        return saved ? JSON.parse(saved) : [
            { id: '#1001', date: '2024-05-20', clientName: 'Alice Smith', company: 'Tech Solutions', phone: '077-1234567', status: 'Pending' },
            { id: '#1002', date: '2024-05-22', clientName: 'Mark Jones', company: 'Innovate Inc', phone: '077-7654321', status: 'Completed' },
            { id: '#1003', date: '2024-05-23', clientName: 'Sarah Connor', company: 'SkyNet Systems', phone: '077-9988776', status: 'In Progress' },
            { id: '#1004', date: '2024-05-25', clientName: 'James Cameron', company: 'Avatar Corp', phone: '077-1112223', status: 'Pending' },
            { id: '#1005', date: '2024-05-26', clientName: 'Ellen Ripley', company: 'Weyland-Yutani', phone: '077-4445556', status: 'Completed' },
            { id: '#1006', date: '2024-05-27', clientName: 'Marty McFly', company: 'Delorean Inc', phone: '077-8889990', status: 'Call Scheduled' },
            { id: '#1007', date: '2024-05-28', clientName: 'Tony Stark', company: 'Stark Ind', phone: '077-3334445', status: 'In Progress' },
            { id: '#1008', date: '2024-05-29', clientName: 'Bruce Wayne', company: 'Wayne Ent', phone: '077-2223334', status: 'Completed' },
            { id: '#1009', date: '2024-05-30', clientName: 'Peter Parker', company: 'Daily Bugle', phone: '077-6667778', status: 'Pending' },
            { id: '#1010', date: '2024-06-01', clientName: 'Clark Kent', company: 'Daily Planet', phone: '077-5556667', status: 'Call Scheduled' },
            { id: '#1011', date: '2024-06-02', clientName: 'Diana Prince', company: 'Themyscira', phone: '077-9990001', status: 'Completed' },
        ];
    });

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null; isBulk?: boolean }>({ isOpen: false, id: null });

    // Toggle selection
    const toggleSelect = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === activities.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(activities.map(r => r.id));
        }
    };

    const handleDeleteSelected = () => {
        setDeleteConfirmation({ isOpen: true, id: null, isBulk: true });
    };

    const confirmDelete = () => {
        if (deleteConfirmation.isBulk) {
            setActivities(prev => prev.filter(a => !selectedRows.includes(a.id)));
            setSelectedRows([]);
        } else if (deleteConfirmation.id) {
            setActivities(prev => prev.filter(a => a.id !== deleteConfirmation.id));
            if (selectedActivity?.id === deleteConfirmation.id) {
                setIsDrawerOpen(false);
                setSelectedActivity(null);
            }
        }
        setDeleteConfirmation({ isOpen: false, id: null });
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(activities.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentActivities = activities.slice(indexOfFirstItem, indexOfLastItem);

    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const handleRowClick = (activity: Activity) => {
        setSelectedActivity(activity);
        setIsDrawerOpen(true);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email) return;

        const newActivity = {
            id: `#${1000 + activities.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            clientName: formData.name,
            company: 'New Client',
            phone: formData.phone || '-',
            // Set status to 'Pending' for form submissions
            status: 'Pending'
        };

        setActivities([newActivity, ...activities]);

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            description: '',
            agreePhone: false,
            agreeEmail: false
        });
    };

    const handleBooking = () => {
        const formattedDate = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        const newActivity = {
            id: `#${1000 + activities.length + 1}`,
            date: formattedDate,
            clientName: formData.name || 'Guest Client',
            company: '-',
            phone: formData.phone || '-',
            status: 'Call Scheduled'
        };
        setActivities([newActivity, ...activities]);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] p-4 md:p-12 bg-white dark:bg-zinc-950 transition-colors animate-in fade-in duration-500">

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">

                {/* Left Column: Form */}
                <div className="flex-1 flex flex-col pt-4">
                    <div className="flex items-baseline justify-between mb-12">
                        <h1 className="text-4xl md:text-5xl font-normal text-zinc-900 dark:text-white tracking-tight">
                            Fill the form
                        </h1>
                        <span className="text-2xl text-zinc-300 dark:text-zinc-700 font-light hidden sm:inline-block">or</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12 max-w-lg">
                        {/* Name Input */}
                        <div className="relative group">
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Marta Lewandowska"
                                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 text-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <label htmlFor="name" className="absolute -top-6 left-0 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                First and Last Name
                            </label>
                        </div>

                        {/* Email & Phone Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative group">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@company.com"
                                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 text-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <label htmlFor="email" className="absolute -top-6 left-0 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                    E-mail
                                </label>
                            </div>
                            <div className="relative group">
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 123 456 7890"
                                    className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 text-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <label htmlFor="phone" className="absolute -top-6 left-0 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                    Phone Number
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="relative group">
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Briefly describe your business (e.g. industry, form of work), so that we can choose the appropriate settlement."
                                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                            />
                            <label htmlFor="description" className="absolute -top-6 left-0 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                Message
                            </label>
                        </div>

                        <div className="space-y-4 pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group" onClick={() => handleCheckboxChange('agreePhone')}>
                                <div className={`mt-1 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white transition-colors ${formData.agreePhone ? 'bg-blue-500' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                                    {formData.agreePhone && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                                </div>
                                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-tight select-none">
                                    I agree to telephone contact
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group" onClick={() => handleCheckboxChange('agreeEmail')}>
                                <div className={`mt-1 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white transition-colors ${formData.agreeEmail ? 'bg-blue-500' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                                    {formData.agreeEmail && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                                </div>
                                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-tight select-none">
                                    I agree to email contact
                                </span>
                            </label>
                        </div>

                        <div className="pt-4">
                            <Button
                                className="rounded-full px-8 py-6 text-base font-medium bg-[#4F6EF7] hover:bg-[#4361EE] text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                            >
                                Confirm and send
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Booking */}
                <div className="flex-1 pt-4 lg:pl-12">
                    <div className="mb-12 hidden lg:block">
                        <h1 className="text-4xl md:text-5xl font-normal text-zinc-900 dark:text-white tracking-tight">
                            Book a call
                        </h1>
                    </div>

                    <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-xl mx-auto lg:mr-auto rounded-3xl overflow-hidden shadow-2xl">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7F56D9] via-[#4F6EF7] to-[#D946EF]" />

                        {/* Inner White Card */}
                        <div className="absolute inset-0 m-6 md:m-8 lg:m-12 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">

                            {/* Left Side of Card: Info */}
                            <div className="p-6 flex-1 flex flex-col justify-between relative">
                                <div>
                                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white shadow-sm flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                                        <User className="w-8 h-8 text-zinc-400" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">Talk to us</h3>
                                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                                        <Clock className="w-4 h-4" />
                                        <span>30 min</span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <Video className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium">Video call</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium">Phone call</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 pb-6">
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                                        Select a convenient time in our online calendar.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side of Card: Functional Calendar */}
                            <div className="hidden md:flex w-fit bg-zinc-50 dark:bg-zinc-800/50 border-l border-zinc-100 dark:border-zinc-800 flex-col p-4 items-center justify-center">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 self-start">Select Date</span>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center lg:text-left mx-auto max-w-xl">
                        <button
                            onClick={handleBooking}
                            className="flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
                        >
                            Book a call <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-24 animate-in slide-in-from-bottom-8 duration-700 delay-100">

                {/* Part 1: Contact Channels */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-normal text-zinc-900 dark:text-white tracking-tight mb-2">
                        Get in touch
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* WhatsApp Card */}
                        <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 transition-all hover:scale-[1.02] cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/30 transition-all">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">WhatsApp</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 font-mono">+94 76 123 4567</p>
                            <span className="text-green-600 dark:text-green-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Start Chat <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>

                        {/* Email Card */}
                        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 transition-all hover:scale-[1.02] cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">Email</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">info@nexora.com</p>
                            <span className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Send Email <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Part 2: About Us Description */}
                <div className="flex flex-col justify-center p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">About Nexora</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                        We are a dedicated team of professionals committed to providing top-tier audit and assurance services.
                        With a focus on transparency, integrity, and client satisfaction, we help businesses navigate complex
                        financial landscapes with confidence. Our digital-first approach ensures you always have access to
                        your data when you need it.
                    </p>
                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
                            ))}
                        </div>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Trusted by 500+ companies</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Recent Activities Table */}
            <div className="max-w-full animate-in slide-in-from-bottom-8 duration-700 delay-200">
                <div className="flex items-baseline justify-between mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-normal text-zinc-900 dark:text-white tracking-tight">
                            Recent Activities
                        </h2>
                        {selectedRows.length > 0 && (
                            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full animate-in fade-in slide-in-from-left-2">
                                <span className="text-xs font-medium text-red-600 dark:text-red-400">{selectedRows.length} selected</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleDeleteSelected}
                                    className="h-6 w-6 text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-full"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        )}
                    </div>
                    <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        View All
                    </Button>
                </div>

                <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-50/50 dark:bg-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800">
                                <TableHead className="w-[50px] pl-6 pr-2">
                                    <Checkbox
                                        checked={activities.length > 0 && selectedRows.length === activities.length}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                                <TableHead className="font-medium text-zinc-500 dark:text-zinc-400">ID</TableHead>
                                <TableHead className="font-medium text-zinc-500 dark:text-zinc-400">Date</TableHead>
                                <TableHead className="font-medium text-zinc-500 dark:text-zinc-400">Client</TableHead>
                                <TableHead className="font-medium text-zinc-500 dark:text-zinc-400">Company</TableHead>
                                <TableHead className="font-medium text-zinc-500 dark:text-zinc-400">Phone</TableHead>
                                <TableHead className="font-medium text-zinc-500 dark:text-zinc-400 text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentActivities.map((activity) => (
                                <TableRow
                                    key={activity.id}
                                    className={`border-zinc-100 dark:border-zinc-800 transition-colors cursor-pointer ${selectedRows.includes(activity.id) ? 'bg-zinc-50 dark:bg-zinc-800/50' : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50'}`}
                                    onClick={() => handleRowClick(activity)}
                                >
                                    <TableCell className="pl-6 pr-2" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectedRows.includes(activity.id)}
                                            onCheckedChange={() => toggleSelect(activity.id)}
                                            aria-label={`Select row ${activity.id}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-zinc-900 dark:text-white">{activity.id}</TableCell>
                                    <TableCell className="text-zinc-600 dark:text-zinc-400">{activity.date}</TableCell>
                                    <TableCell className="text-zinc-900 dark:text-white font-medium">{activity.clientName}</TableCell>
                                    <TableCell className="text-zinc-600 dark:text-zinc-400">{activity.company}</TableCell>
                                    <TableCell className="text-zinc-600 dark:text-zinc-400">{activity.phone}</TableCell>
                                    <TableCell className="text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                            ${activity.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                activity.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                                                    activity.status === 'Call Scheduled' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                                                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                            {activity.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, activities.length)} of {activities.length} entries
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Sliding Drawer / Sheet */}
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
                        onClick={() => setIsDrawerOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white dark:bg-zinc-950 shadow-2xl z-50 transform transition-transform animate-in slide-in-from-right duration-300 border-l border-zinc-100 dark:border-zinc-800 flex flex-col">

                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Client Details</h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">View and manage record information</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)} className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {selectedActivity && (
                                <>
                                    {/* Client Profile Header */}
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-bold">
                                            {selectedActivity.clientName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{selectedActivity.clientName}</h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">{selectedActivity.company}</p>
                                            <div className="mt-2 inline-flex">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                    ${selectedActivity.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                        selectedActivity.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                                                            selectedActivity.status === 'Call Scheduled' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                                                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                    {selectedActivity.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">Record ID</p>
                                            <p className="font-mono text-zinc-900 dark:text-white font-medium">{selectedActivity.id}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">Date</p>
                                            <p className="text-zinc-900 dark:text-white font-medium">{selectedActivity.date}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 col-span-2">
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">Contact Phone</p>
                                            <p className="text-zinc-900 dark:text-white font-medium flex items-center gap-2">
                                                <Phone className="h-3.5 w-3.5" /> {selectedActivity.phone}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Documents Section (Mock) */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                                            <FileText className="h-4 w-4" /> Related Documents
                                        </h4>
                                        <div className="space-y-2">
                                            {['Invoice_001.pdf', 'Contract_Signed.pdf'].map((doc, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                                                            <FileText className="h-4 w-4" />
                                                        </div>
                                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{doc}</span>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-blue-500">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 flex gap-3">
                            {selectedActivity && (
                                <Button
                                    variant="outline"
                                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"
                                    onClick={() => setDeleteConfirmation({ isOpen: true, id: selectedActivity.id })}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            )}
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                View Full Profile
                            </Button>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, id: null })}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                            <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <DialogTitle className="text-center text-xl">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            {deleteConfirmation.isBulk
                                ? `Are you sure you want to delete ${selectedRows.length} selected records? This action cannot be undone.`
                                : "Are you sure you want to delete this record? This action cannot be undone."
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center gap-3 mt-4 w-full">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteConfirmation({ isOpen: false, id: null })}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ClientPortal;
