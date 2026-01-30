import { useRef } from "react"
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, User } from "lucide-react"

export default function TeamPage() {
    const contactSectionRef = useRef<HTMLDivElement>(null)

    const scrollToContact = () => {
        contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F6FAFD]">
            {/* --- Navbar --- */}
            <nav className="sticky top-0 z-50 w-full bg-[#0A1931] text-white shadow-lg border-b border-[#1A3D63]">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <div className="h-10 w-10 bg-gradient-to-br from-[#00DBDE] to-[#FC00FF] rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
                            A
                        </div>
                        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B3CFE5]">
                            AuditFirm
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-[#00DBDE] font-medium text-sm tracking-wide border-b-2 border-[#00DBDE]">
                            Team
                        </button>
                        <button onClick={scrollToContact} className="text-[#B3CFE5] hover:text-[#00DBDE] transition-colors font-medium text-sm tracking-wide">
                            Contact Us
                        </button>
                        <div className="h-8 w-[1px] bg-[#1A3D63]"></div>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#1A3D63] flex items-center justify-center text-[#B3CFE5]">
                                <User className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Guest User</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Main Content --- */}
            <main className="flex-1 container mx-auto px-6 py-10 space-y-8">
                <div className="text-center py-12">
                    <h1 className="text-4xl font-bold text-[#0A1931] tracking-tight mb-4">Our Team</h1>
                    <p className="text-[#4A7FA7] text-lg max-w-2xl mx-auto">
                        Meet the dedicated professionals behind our success. We are committed to delivering excellence in every audit.
                    </p>
                </div>

                {/* Team Members Placeholder Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Placeholder Item 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-[#B3CFE5]/30 flex flex-col items-center hover:shadow-xl transition-shadow">
                        <div className="h-24 w-24 rounded-full bg-slate-200 mb-4"></div>
                        <h3 className="text-xl font-bold text-[#0A1931]">John Doe</h3>
                        <div className="text-[#00DBDE] font-medium mb-2">Senior Partner</div>
                        <p className="text-[#4A7FA7] text-center text-sm">Expert in financial auditing and risk management with over 15 years of experience.</p>
                    </div>
                    {/* Placeholder Item 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-[#B3CFE5]/30 flex flex-col items-center hover:shadow-xl transition-shadow">
                        <div className="h-24 w-24 rounded-full bg-slate-200 mb-4"></div>
                        <h3 className="text-xl font-bold text-[#0A1931]">Jane Smith</h3>
                        <div className="text-[#00DBDE] font-medium mb-2">Lead Auditor</div>
                        <p className="text-[#4A7FA7] text-center text-sm">Specializes in forensic audit and compliance tracking.</p>
                    </div>
                    {/* Placeholder Item 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-[#B3CFE5]/30 flex flex-col items-center hover:shadow-xl transition-shadow">
                        <div className="h-24 w-24 rounded-full bg-slate-200 mb-4"></div>
                        <h3 className="text-xl font-bold text-[#0A1931]">Robert Brown</h3>
                        <div className="text-[#00DBDE] font-medium mb-2">Tax Consultant</div>
                        <p className="text-[#4A7FA7] text-center text-sm">Provides strategic tax planning and advisory services.</p>
                    </div>
                </div>

            </main>

            {/* --- Footer --- */}
            <footer ref={contactSectionRef} className="bg-[#0A1931] text-white pt-16 pb-8 border-t border-[#1A3D63]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 bg-gradient-to-br from-[#00DBDE] to-[#FC00FF] rounded-lg flex items-center justify-center font-bold text-lg">A</div>
                                <span className="text-xl font-bold">AuditFirm</span>
                            </div>
                            <p className="text-[#B3CFE5] text-sm leading-relaxed">
                                Empowering your business with precise audit solutions and comprehensive management tools.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <a href="#" className="h-8 w-8 rounded-full bg-[#1A3D63] flex items-center justify-center text-[#B3CFE5] hover:bg-[#00DBDE] hover:text-[#0A1931] transition-all">
                                    <Facebook className="h-4 w-4" />
                                </a>
                                <a href="#" className="h-8 w-8 rounded-full bg-[#1A3D63] flex items-center justify-center text-[#B3CFE5] hover:bg-[#00DBDE] hover:text-[#0A1931] transition-all">
                                    <Twitter className="h-4 w-4" />
                                </a>
                                <a href="#" className="h-8 w-8 rounded-full bg-[#1A3D63] flex items-center justify-center text-[#B3CFE5] hover:bg-[#00DBDE] hover:text-[#0A1931] transition-all">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                                <a href="#" className="h-8 w-8 rounded-full bg-[#1A3D63] flex items-center justify-center text-[#B3CFE5] hover:bg-[#00DBDE] hover:text-[#0A1931] transition-all">
                                    <Instagram className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00DBDE] to-[#FC00FF]">Quick Links</h3>
                            <ul className="space-y-3 text-[#B3CFE5] text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00DBDE] to-[#FC00FF]">Services</h3>
                            <ul className="space-y-3 text-[#B3CFE5] text-sm">
                                <li>Audit & Assurance</li>
                                <li>Tax Consultation</li>
                                <li>Risk Management</li>
                                <li>Forensic Audit</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00DBDE] to-[#FC00FF]">Contact Us</h3>
                            <div className="space-y-4 text-[#B3CFE5] text-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-[#00DBDE] shrink-0" />
                                    <span>123 Audit Street, Financial District, New York, NY 10001</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-[#00DBDE] shrink-0" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-[#00DBDE] shrink-0" />
                                    <span>support@auditfirm.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#1A3D63] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#4A7FA7]">
                        <p>&copy; {new Date().getFullYear()} AuditFirm Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-[#00DBDE]">Terms of Service</a>
                            <a href="#" className="hover:text-[#00DBDE]">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
