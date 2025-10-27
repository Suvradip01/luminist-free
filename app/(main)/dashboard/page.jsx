"use client";

import { useConvexQuery } from '@/components/hooks/use-convex-query';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Plus, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import { BarLoader } from 'react-spinners';
import NewProjectModal from './_components/new-project-modal';
import ProjectGrid from './_components/project-grid';
import { AnimatedWords } from '@/components/AnimatedTextone';

const Dashboard = () => {
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const { data: projects, isLoading } = useConvexQuery(api.projects.getUserProjects);
    return (
        <div className="min-h-screen pt-38 pb-16">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Your Projects
                        </h1>
                        <p className="text-white/70">
                            Effortlessly build and refine your designs with AI precision.
                        </p>
                    </div>
                    <Button
                        onClick={() => setShowNewProjectModal(true)}
                        variant="primary" size="lg" className="gap-2">
                        <Plus className="h-5 w-5" />
                        New Project
                    </Button>
                </div>
                {isLoading ? (
                    <BarLoader width={"100%"} color="white" />
                ) : projects && projects.length > 0 ? (
                    <ProjectGrid projects={projects} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <AnimatedWords
                            words={["Create Something New", "Design Your Vision", "Build Your Masterpiece"]}
                            className="text-white text-5xl font-bold p-4"
                        />
                        <p className="text-white/70 max-w-md mb-8">
                            Your creativity starts here — upload your image and let AI do the magic.
                        </p>

                        {/* The button is now a child of the centered flex-col container */}
                        <Button
                            onClick={() => setShowNewProjectModal(true)}
                            variant="primary"
                            size="lg"
                            className="gap-2"
                        >
                            <Sparkles className="h-5 w-5" />
                            Start Designing
                        </Button>
                    </div>
                )}
                <NewProjectModal
                    isOpen={showNewProjectModal}
                    onClose={() => setShowNewProjectModal(false)}
                />
            </div>
        </div >
    );
};


export default Dashboard;