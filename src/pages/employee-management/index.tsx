import { useState, useRef } from "react"
import { Search, Plus, Phone, Mail, User, MoreVertical, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock Data
const initialEmployees = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "+1 234 567 890", role: "Auditor", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "+1 987 654 321", role: "Manager", status: "Active" },
    { id: 3, name: "Charlie Hidden", email: "charlie@example.com", phone: "+1 555 123 456", role: "Intern", status: "Inactive" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", phone: "+1 444 999 888", role: "Senior Auditor", status: "Active" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", phone: "+1 777 000 111", role: "Security", status: "Active" },
]

export default function EmployeeManagement() {
    const [employees] = useState(initialEmployees)
    const [searchTerm, setSearchTerm] = useState("")
    const contactSectionRef = useRef<HTMLDivElement>(null)

    const scrollToContact = () => {
        contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen flex flex-col bg-[#F6FAFD]">
            {/* --- Navbar --- */}
            <nav className="sticky top-0 z-50 w-full bg-[#0A1931] text-white shadow-lg border-b border-[#1A3D63]">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Placeholder Logo */}
                        <div className="h-10 w-10 bg-gradient-to-br from-[#00DBDE] to-[#FC00FF] rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
                            A
                        </div>
                        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B3CFE5]">
                            AuditFirm
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-[#B3CFE5] hover:text-[#00DBDE] transition-colors font-medium text-sm tracking-wide">
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
                            <span className="text-sm font-medium">Admin User</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Main Content --- */}
            <main className="flex-1 container mx-auto px-6 py-10 space-y-8">

                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-[#0A1931] tracking-tight">Employee Management</h1>
                        <p className="text-[#4A7FA7] mt-2 text-lg">Manage your team members, roles, and access.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="relative w-full sm:w-72 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A7FA7] group-focus-within:text-[#00DBDE] transition-colors" />
                            <Input
                                placeholder="Search employees..."
                                className="pl-10 bg-white border-[#B3CFE5] focus-visible:ring-[#00DBDE] shadow-sm h-11"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] hover:opacity-90 transition-opacity border-0 h-11 px-6 shadow-md font-semibold">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Member
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-xl border border-[#B3CFE5]/30 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-[#F6FAFD]">
                            <TableRow className="border-[#B3CFE5]">
                                <TableHead className="w-[250px] font-bold text-[#1A3D63] h-14">User Name</TableHead>
                                <TableHead className="font-bold text-[#1A3D63]">Email</TableHead>
                                <TableHead className="font-bold text-[#1A3D63]">Phone</TableHead>
                                <TableHead className="font-bold text-[#1A3D63]">Role</TableHead>
                                <TableHead className="text-right font-bold text-[#1A3D63] pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployees.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                        No employees found matching your search.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredEmployees.map((employee) => (
                                    <TableRow key={employee.id} className="hover:bg-[#F6FAFD]/50 border-[#B3CFE5]/30 transition-colors">
                                        <TableCell className="font-medium text-[#0A1931] py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#00DBDE]/20 to-[#FC00FF]/20 flex items-center justify-center text-[#1A3D63] font-bold text-xs border border-[#B3CFE5]">
                                                    {employee.name.slice(0, 2).toUpperCase()}
                                                </div>
                                                {employee.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-[#4A7FA7]">{employee.email}</TableCell>
                                        <TableCell className="text-[#4A7FA7]">{employee.phone}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-[#00DBDE] text-[#1A3D63] bg-[#00DBDE]/10 font-medium">
                                                {employee.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 text-[#4A7FA7] hover:text-[#0A1931] hover:bg-[#B3CFE5]/20">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px]">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                        Remove Member
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
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
