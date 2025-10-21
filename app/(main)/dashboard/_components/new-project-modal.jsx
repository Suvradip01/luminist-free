import { useConvexQuery } from '@/components/hooks/use-convex-query';
import { usePlanAccess } from '@/components/hooks/use-plan-access';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { Badge, Crown } from 'lucide-react';
import React from 'react'

const NewProjectModal = ({ isOpen, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    // Assuming usePlanAccess provides:
    // isFree: boolean
    // canCreateProject: function
    const { isFree, canCreateProject } = usePlanAccess();
    const { data: projects } = useConvexQuery(api.projects.getUserProjects)

    const currentProjectCount = projects?.length || 0;
    const canCreate = canCreateProject(currentProjectCount);

    // Define the limit for easier reading and potential future changes
    const PROJECT_LIMIT = 5;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">
                            Create New Project
                        </DialogTitle>

                        {isFree && (
                            // Show current project count out of 5
                            <Badge variant="secondary" className="bg-state-700 text-white/70">
                                {currentProjectCount}/{PROJECT_LIMIT} projects
                            </Badge>
                        )}
                    </DialogHeader>
                    <div className="space-y-6">
                        {/* Alert shows if user is Free AND they are on their 4th project or more (4 is the last free project) */}
                        {isFree && currentProjectCount >= PROJECT_LIMIT - 1 && (
                            <Alert className="bg-amber-500/10 border-amber-500/20">
                                <Crown className="h-5 w-5 text-amber-400" />
                                <AlertDescription className="text-amber-300/80">
                                    <div className="font-semibold text-amber-400 mb-1">
                                        {/* Heading: Last Free Project (at count 4) or Limit Reached (at count 5+) */}
                                        {currentProjectCount === PROJECT_LIMIT - 1
                                            ? "Last Free Project"
                                            : "Project Limit Reached"}
                                    </div>

                                    {/* Detailed Message: Updated the '3 projects' text to '5 projects' */}
                                    {currentProjectCount === PROJECT_LIMIT - 1
                                        ? "This will be your last free project. Upgrade to Pixxel Pro for unlimited projects."
                                        : `Free plan is limited to ${PROJECT_LIMIT} projects. Upgrade to Pixxel Pro to create more projects.`}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter>Footer</DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default NewProjectModal;