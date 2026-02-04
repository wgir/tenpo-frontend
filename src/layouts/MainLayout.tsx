import React, { useState } from 'react';
import {
    BarChart3,
    Users,
    UserCircle,
    Menu,
    Bell
} from 'lucide-react';
import { cn } from '../components/ui/Button';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex w-full items-center space-x-3 rounded-lg px-4 py-3 transition-colors",
            active
                ? "bg-primary-50 text-primary-600 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        )}
    >
        <Icon size={20} />
        <span>{label}</span>
    </button>
);

interface MainLayoutProps {
    children: React.ReactNode;
    activeSection: 'transactions' | 'clients' | 'employees';
    setActiveSection: (section: 'transactions' | 'clients' | 'employees') => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeSection, setActiveSection }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 bg-white border-r border-slate-200 w-64 z-50 transform transition-transform lg:translate-x-0 lg:static lg:inset-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center space-x-2 mb-10">
                        <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">T</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            Tenpo
                        </span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <SidebarItem
                            icon={BarChart3}
                            label="Transacciones"
                            active={activeSection === 'transactions'}
                            onClick={() => { setActiveSection('transactions'); setIsSidebarOpen(false); }}
                        />
                        <SidebarItem
                            icon={Users}
                            label="Clientes"
                            active={activeSection === 'clients'}
                            onClick={() => { setActiveSection('clients'); setIsSidebarOpen(false); }}
                        />
                        <SidebarItem
                            icon={UserCircle}
                            label="Empleados"
                            active={activeSection === 'employees'}
                            onClick={() => { setActiveSection('employees'); setIsSidebarOpen(false); }}
                        />
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center space-x-4">
                        <button
                            className="lg:hidden text-slate-600"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold text-slate-900">
                            {activeSection === 'transactions' && "Dashboard de Transacciones"}
                            {activeSection === 'clients' && "Gestión de Clientes"}
                            {activeSection === 'employees' && "Gestión de Empleados"}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="text-slate-400 hover:text-slate-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar" />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};
