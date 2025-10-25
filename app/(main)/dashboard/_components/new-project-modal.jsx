import { useConvexMutation, useConvexQuery } from '@/components/hooks/use-convex-query';
import { usePlanAccess } from '@/components/hooks/use-plan-access';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UpgradeModal from '@/components/upgrade-modal';
import { api } from '@/convex/_generated/api';
import { Badge, Crown, ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

const NewProjectModal = ({ isOpen, onClose }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const router = useRouter();

    const handleClose = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setProjectTitle("");
        setIsUploading(false);
        onClose();
    };

    const { isFree } = usePlanAccess();
    const { data: projects } = useConvexQuery(api.projects.getUserProjects);
    const { mutate: createProject } = useConvexMutation(api.projects.create);

    const PROJECT_LIMIT = 5;
    const currentProjectCount = projects?.length || 0;
    const canCreate = !isFree || currentProjectCount < PROJECT_LIMIT;

    const remainingProjects = PROJECT_LIMIT - currentProjectCount;

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            setProjectTitle(nameWithoutExt || "Untitled Project");
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
        },
        maxFiles: 1,
        maxSize: 20 * 1024 * 1024,
    });

    const handleCreateProject = async () => {
        if (!canCreate) {
            setShowUpgradeModal(true);
            return;
        }

        if (!selectedFile || !projectTitle.trim()) {
            toast.error("Please select an image and enter a project title");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("fileName", selectedFile.name);

            const uploadResponse = await fetch("/api/imagekit/upload", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            if (!uploadData.success) {
                throw new Error(uploadData.error || "Failed to upload image");
            }

            const project = await createProject({
                title: projectTitle.trim(),
                originalImageUrl: uploadData.url,
                currentImageUrl: uploadData.url,
                thumbnailUrl: uploadData.thumbnailUrl,
                width: uploadData.width || 800,
                height: uploadData.height || 600,
                canvasState: null,
            });

            const projectId = project?._id || project;
            toast.success("Project created successfully!");
            router.push(`/editor/${projectId}`);
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error(error.message || "Failed to create project. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (isFree && currentProjectCount >= PROJECT_LIMIT) {
            setShowUpgradeModal(true);
        }
    }, [currentProjectCount, isFree]);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">
                            Create New Project
                        </DialogTitle>

                        {isFree && (
                            <Badge variant="secondary" className="bg-state-700 text-white/70">
                                {currentProjectCount}/{PROJECT_LIMIT} projects
                            </Badge>
                        )}
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Show remaining projects or limit reached message */}
                        {isFree && currentProjectCount < PROJECT_LIMIT && currentProjectCount > 0 && (
                            <Alert className="bg-amber-500/10 border-amber-500/20">
                                <Crown className="h-5 w-5 text-amber-400" />
                                <AlertDescription className="text-amber-300/80">
                                    <div className="font-semibold text-amber-400 mb-1">
                                        {remainingProjects} Projects Remaining
                                    </div>
                                    You have {remainingProjects} free project{remainingProjects > 1 ? "s" : ""} remaining on your plan.
                                </AlertDescription>
                            </Alert>
                        )}

                        {isFree && currentProjectCount >= PROJECT_LIMIT && (
                            <Alert className="bg-amber-500/10 border-amber-500/20">
                                <Crown className="h-5 w-5 text-amber-400" />
                                <AlertDescription className="text-amber-300/80">
                                    <div className="font-semibold text-amber-400 mb-1">
                                        Oops! Project Limit Reached
                                    </div>
                                    Free plan is limited to {PROJECT_LIMIT} projects. Upgrade to Luminist Pro to create more projects.
                                </AlertDescription>
                            </Alert>
                        )}

                        {!selectedFile ? (
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                                    ${isDragActive
                                        ? "border-cyan-400 bg-cyan-400/5"
                                        : "border-white/20 hover:border-white/40"
                                    }
                                    ${!canCreate ? "opacity-50 pointer-events-none" : ""}`}
                            >
                                <input {...getInputProps()} />
                                <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {isDragActive ? "Drop your image here" : "Upload an Image"}
                                </h3>
                                <p className="text-white/70 mb-4">
                                    {canCreate
                                        ? "Drag and drop your image, or click to browse"
                                        : "Upgrade to Pro to create more projects"}
                                </p>
                                <p className="text-sm text-white/50">
                                    Supports PNG, JPG, WEBP up to 20MB
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="relative">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-xl border border-white/10"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPreviewUrl(null);
                                            setProjectTitle("");
                                        }}
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="project-title" className="text-white">
                                        Project Title
                                    </Label>
                                    <Input
                                        id="project-title"
                                        type="text"
                                        value={projectTitle}
                                        onChange={(e) => setProjectTitle(e.target.value)}
                                        placeholder="Enter project name..."
                                        className="bg-slate-700 border-white/20 text-white placeholder-white/50 focus:border-cyan-400 focus:ring-cyan-400"
                                    />
                                </div>

                                <div className="bg-slate-700/50 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <ImageIcon className="h-5 w-5 text-cyan-400" />
                                        <div className="space-y-1">
                                            <p className="text-white font-medium">{selectedFile.name}</p>
                                            <p className="text-white/70 text-sm">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-3">
                        <Button
                            variant="ghost"
                            onClick={handleClose}
                            disabled={isUploading}
                            className="text-white/70 hover:text-white"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleCreateProject}
                            disabled={!selectedFile || !projectTitle.trim() || isUploading}
                            variant="primary"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Project"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Upgrade modal when limit reached */}
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                restrictedTool="projects"
                reason="Free plan is limited to 5 projects. Upgrade to Pro for unlimited projects and access to all AI editing tools."
            />
        </>
    );
};

export default NewProjectModal;
