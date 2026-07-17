"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    FaHome,
    FaProjectDiagram,
    FaUsers,
    FaTasks,
    FaComments,
    FaSignOutAlt
} from "react-icons/fa";

import {
    isAdmin,
    isProjectManager,
    isTeamMember
} from "@/utils/auth";

import { logout } from "@/services/auth";

export default function Sidebar() {

    const router = useRouter();

    const admin = isAdmin();
    const manager = isProjectManager();
    const member = isTeamMember();

    const handleLogout = async () => {

        try {
            await logout();
        } catch (error) {
            console.log(error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/");
    };

    return (

        <aside
            className="
            w-64
            min-h-screen
            bg-slate-900
            text-white
            p-6
            fixed
            left-0
            top-0
            "
        >

            <h1
                className="
                text-2xl
                font-bold
                mb-10
                "
            >
                TaskFlow
            </h1>

            <nav className="space-y-3">

                {/* Dashboard - Everyone */}

                <Link
                    href="/dashboard"
                    className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-lg
                    hover:bg-slate-700
                    "
                >
                    <FaHome />
                    Dashboard
                </Link>

                {/* Projects - Admin & Project Manager */}

                {(admin || manager) && (

                    <Link
                        href="/projects"
                        className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-slate-700
                        "
                    >
                        <FaProjectDiagram />
                        Projects
                    </Link>

                )}

                {/* Tasks - Everyone */}

                <Link
                    href="/tasks"
                    className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-lg
                    hover:bg-slate-700
                    "
                >
                    <FaTasks />
                    Tasks
                </Link>

                {/* Users - Administrator Only */}

                {admin && (

                    <Link
                        href="/users"
                        className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-slate-700
                        "
                    >
                        <FaUsers />
                        Users
                    </Link>

                )}

                {/* Comments - Everyone */}

                <Link
                    href="/comments"
                    className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-lg
                    hover:bg-slate-700
                    "
                >
                    <FaComments />
                    Comments
                </Link>

            </nav>

            <button

                onClick={handleLogout}

                className="
                absolute
                bottom-8
                flex
                items-center
                gap-3
                p-3
                text-red-400
                hover:text-red-300
                "

            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}