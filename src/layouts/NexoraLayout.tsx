import { useState, useEffect } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { ChevronDown, ChevronRight, ChevronLeft, LogOut, UserIcon, Settings, Bell, Search, Sun, Moon, FileText, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NexoraLayout() {
    const [expanded, setExpanded] = useState<string[]>(["accounts-audit"])
    // Theme state
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const location = useLocation()

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        if (storedTheme) {
            setTheme(storedTheme)
            document.documentElement.classList.toggle("dark", storedTheme === "dark")
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
        localStorage.setItem("theme", newTheme)
    }

    const toggleExpand = (key: string) => {
        setExpanded(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        )
    }



    return (
        // Nexora Theme - Unified Shell Layout
        <div className="flex h-screen w-full bg-zinc-100 dark:bg-black overflow-hidden text-zinc-900 dark:text-zinc-100 font-sans">

            {/* Sidebar - Transparent to blend with shell */}
            <aside className="relative w-60 bg-transparent hidden md:block flex-shrink-0 overflow-hidden z-20">
                {/* Logo Area */}
                <div className="flex h-20 items-center justify-center relative z-10">
                    <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-tight group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                            <img src="/logo.png" alt="Logo" className="h-6 w-6 object-contain invert brightness-0" />
                        </div>
                        <span className="text-zinc-800 dark:text-zinc-100 text-2xl font-bold">Nexora</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-auto py-2 px-4 relative z-10">
                    <nav className="grid items-start gap-1 text-sm font-medium">
                        {/* Main Function: Accounts & Audit */}
                        <div>
                            <button
                                onClick={() => toggleExpand("accounts-audit")}
                                className="flex items-center justify-between w-full px-4 py-3 text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-300 transition-all hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-colors">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <span className="font-semibold">Accounts</span>
                                </div>
                                {expanded.includes("accounts-audit") ? (
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                )}
                            </button>
                            {expanded.includes("accounts-audit") && (
                                <div className="ml-4 mt-2 space-y-1 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                                    {[
                                        { path: "/audit-assurance", label: "Audit & Assurance" },
                                        { path: "/internal-audit", label: "Internal Audit" },
                                        { path: "/forensic-audit", label: "Forensic Audit" },
                                        { path: "/management-account", label: "Management Account" },
                                        { path: "/tax-account", label: "Tax Account" },
                                        { path: "/internal-control-outsourcing", label: "Internal Control" }
                                    ].map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={cn(
                                                "block py-2 px-3 rounded-lg text-sm transition-colors",
                                                location.pathname.startsWith(item.path)
                                                    ? "text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-900/10"
                                                    : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Main Function: Client Portal (Nexora) */}
                        <div className="mt-4">
                            <Link
                                to="/client-portal"
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                                    location.pathname.startsWith("/client-portal")
                                        ? "bg-white dark:bg-zinc-900 shadow-md shadow-purple-500/5 ring-1 ring-purple-500/20"
                                        : "hover:bg-white/50 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-lg shadow-sm border transition-colors",
                                    location.pathname.startsWith("/client-portal")
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 group-hover:border-purple-200 dark:group-hover:border-purple-800"
                                )}>
                                    <Globe className="h-4 w-4" />
                                </div>
                                <span className={cn(
                                    "font-semibold",
                                    location.pathname.startsWith("/client-portal") ? "text-purple-900 dark:text-purple-100" : ""
                                )}>Nexora Portal</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 overflow-hidden relative z-10">
                {/* Header - Transparent to blend with shell */}
                <header className="flex h-20 items-center gap-4 bg-transparent px-8 z-20 overflow-visible">

                    {/* Breadcrumb / Page Title Area */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={() => window.history.back()}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
                            <button
                                onClick={() => window.history.forward()}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        {/* Search */}
                        <div className="relative hidden lg:block w-72">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                            <Input
                                type="search"
                                placeholder="Type to search..."
                                className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 h-10 rounded-full shadow-sm focus-visible:ring-purple-500/20"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="rounded-full w-9 h-9 text-zinc-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            >
                                {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-zinc-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 relative">
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white dark:border-zinc-900" />
                            </Button>
                        </div>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="rounded-full pl-1 pr-2 py-1 h-10 gap-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 ml-2 shadow-sm">
                                    <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-100">
                                        <img src="/1.png" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 mr-1">Account</span>
                                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 shadow-xl rounded-2xl p-2">
                                <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">My Account</DropdownMenuLabel>
                                <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer focus:bg-purple-50 dark:focus:bg-purple-900/20 focus:text-purple-600">
                                    <UserIcon className="mr-2 h-4 w-4" /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer focus:bg-purple-50 dark:focus:bg-purple-900/20 focus:text-purple-600">
                                    <Settings className="mr-2 h-4 w-4" /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-1 bg-zinc-100 dark:bg-zinc-800" />
                                <DropdownMenuItem className="rounded-xl px-3 py-2 text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20 focus:text-rose-700 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Floating Content Area */}
                <main className="flex-1 relative pl-2 overflow-hidden pb-4 pr-4">
                    <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden border border-zinc-100 dark:border-zinc-800 relative clip-content">
                        {/* Scrollable Container */}
                        <div className="absolute inset-0 overflow-y-auto custom-scrollbar flex flex-col">
                            <div className="flex-1">
                                <Outlet />
                            </div>

                            {/* Footer (scrolls with content) */}
                            <div className="h-16 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-center shrink-0 mt-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm">
                                <p className="text-[10px] text-zinc-400 font-medium tracking-wide text-center">
                                    © 2026 Nexora. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
