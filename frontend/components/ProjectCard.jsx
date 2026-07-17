"use client";

import Link from "next/link";

import {
    isAdmin,
    isProjectManager
} from "@/utils/auth";

export default function ProjectCard({
    project,
    onDelete
}) {

    const canManage =
        isAdmin() || isProjectManager();

    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            hover:shadow-xl
            transition
            p-6
            flex
            flex-col
            justify-between
            "
        >

            <div>

                <h2
                    className="
                    text-xl
                    font-bold
                    text-gray-800
                    "
                >
                    {project.name}
                </h2>

                <p
                    className="
                    text-gray-600
                    mt-3
                    line-clamp-3
                    "
                >
                    {project.description || "No description available."}
                </p>

                <div
                    className="
                    flex
                    gap-3
                    mt-5
                    flex-wrap
                    "
                >

                    <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium

                        ${
                            project.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : project.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                        }
                        `}
                    >

                        {project.status}

                    </span>

                    <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium

                        ${
                            project.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : project.priority === "Medium"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-gray-100 text-gray-700"
                        }
                        `}
                    >

                        {project.priority}

                    </span>

                </div>

                <div
                    className="
                    mt-5
                    text-sm
                    text-gray-500
                    "
                >

                    <strong>Manager:</strong>{" "}

                    {project.manager?.name || "Not Assigned"}

                </div>

            </div>

            <div
                className="
                flex
                justify-between
                items-center
                mt-8
                "
            >

                <Link

                    href={`/projects/${project.id}`}

                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    transition
                    "

                >

                    View

                </Link>

                {canManage && (

                    <button

                        onClick={() => {

                            if (
                                confirm(
                                    "Are you sure you want to delete this project?"
                                )
                            ) {

                                onDelete(project.id);

                            }

                        }}

                        className="
                        text-red-600
                        hover:text-red-800
                        font-medium
                        "

                    >

                        Delete

                    </button>

                )}

            </div>

        </div>

    );

}