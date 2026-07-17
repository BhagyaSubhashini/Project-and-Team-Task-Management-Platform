"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import ProjectCard from "@/components/ProjectCard";
import CreateProjectModal from "@/components/CreateProjectModal";

import {
    getProjects,
    deleteProject
} from "@/services/project";

import {
    getUser,
    isAdmin,
    isProjectManager
} from "@/utils/auth";

export default function ProjectsPage() {

    const [projects, setProjects] = useState<any[]>([]);

    const [showModal, setShowModal] = useState(false);

    const user = getUser();

    const canManageProjects =
        isAdmin() || isProjectManager();

    const loadProjects = async () => {

        try {

            const response = await getProjects();

            setProjects(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadProjects();

    }, []);

    const handleDelete = async (id: number) => {

        try {

            await deleteProject(id);

            loadProjects();

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="ml-64">

                <Navbar />

                <main className="p-8">

                    {/* Header */}

                    <div className="flex justify-between items-center mb-8">

                        <div>

                            <h1 className="text-3xl font-bold">

                                Projects

                            </h1>

                            <p className="text-gray-500 mt-2">

                                View and manage all projects.

                            </p>

                        </div>

                        {canManageProjects && (

                            <button

                                onClick={() => setShowModal(true)}

                                className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                transition
                                "

                            >

                                + New Project

                            </button>

                        )}

                    </div>

                    {/* Projects */}

                    {

                        projects.length === 0

                            ?

                            <div className="
                            bg-white
                            rounded-xl
                            p-10
                            text-center
                            shadow
                            ">

                                <h2 className="text-xl font-semibold">

                                    No Projects Found

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    {canManageProjects
                                        ? "Create your first project to get started."
                                        : "No projects have been assigned yet."}

                                </p>

                            </div>

                            :

                            <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-6
                            ">

                                {

                                    projects.map((project) => (

                                        <ProjectCard

                                            key={project.id}

                                            project={project}

                                            onDelete={handleDelete}

                                        />

                                    ))

                                }

                            </div>

                    }

                </main>

            </div>

            {

                canManageProjects &&
                showModal &&

                <CreateProjectModal

                    closeModal={() => setShowModal(false)}

                    refreshProjects={loadProjects}

                />

            }

        </div>

    );

}