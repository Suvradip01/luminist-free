"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2, Info } from "lucide-react";
import { useCanvas } from "@/context/context";
import { toast } from "sonner";
import { FabricImage } from "fabric";
import { useConvexMutation } from "@/components/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";

export function EditImageControls({ project }) {
    const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();
    const [prompt, setPrompt] = useState("");

    const { mutate: updateProject } = useConvexMutation(api.projects.updateProject);

    const getActiveImage = () => {
        if (!canvasEditor) return null;
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject && activeObject.type === "image") return activeObject;
        const objects = canvasEditor.getObjects();
        return objects.find((obj) => obj.type === "image") || null;
    };

    const buildImageKitUrlWithEdit = (baseUrl, promptText) => {
        // Check if prompt has special characters
        const hasSpecialChars = /[/:,]/.test(promptText);

        let editTransformation;
        if (hasSpecialChars) {
            // Base64 encode and URL encode for special characters
            const base64Prompt = btoa(promptText);
            const urlEncodedBase64 = encodeURIComponent(base64Prompt);
            editTransformation = `e-edit-prompte-${urlEncodedBase64}`;
        } else {
            // Direct text prompt (replace spaces with underscores for URL safety)
            const sanitizedPrompt = promptText.trim().replace(/\s+/g, '_');
            editTransformation = `e-edit-prompt-${sanitizedPrompt}`;
        }

        const urlObj = new URL(baseUrl);
        const pathname = urlObj.pathname;

        // Split pathname into parts
        const parts = pathname.split('/').filter(p => p);

        // Find if there's already a tr: transformation
        let trIndex = -1;
        let existingTransformations = '';

        for (let i = 0; i < parts.length; i++) {
            if (parts[i].startsWith('tr:')) {
                trIndex = i;
                existingTransformations = parts[i].substring(3);
                break;
            }
        }

        // Remove any existing e-edit transformations
        if (existingTransformations) {
            const transforms = existingTransformations.split(',');
            const filteredTransforms = transforms.filter(t => !t.startsWith('e-edit'));
            existingTransformations = filteredTransforms.join(',');
        }

        // Add new edit transformation
        let newTransformations = existingTransformations
            ? `${existingTransformations},${editTransformation}`
            : editTransformation;

        // Rebuild URL
        if (trIndex !== -1) {
            parts[trIndex] = `tr:${newTransformations}`;
        } else {
            // Insert tr: after account name
            parts.splice(1, 0, `tr:${newTransformations}`);
        }

        urlObj.pathname = '/' + parts.join('/');
        return urlObj.toString();
    };

    const applyEdit = async () => {
        if (!canvasEditor || !project) {
            toast.error("Canvas not ready");
            return;
        }

        const imageObject = getActiveImage();
        if (!imageObject) {
            toast.error("Please select an image to edit");
            return;
        }

        if (!prompt.trim()) {
            toast.error("Please enter a prompt to edit the image");
            return;
        }

        setProcessingMessage("AI is editing your image...");

        try {
            const currentImageUrl = imageObject.getSrc();

            // Build new ImageKit URL with edit transformation
            const transformedUrl = buildImageKitUrlWithEdit(currentImageUrl, prompt);

            console.log('Original URL:', currentImageUrl);
            console.log('Prompt:', prompt);
            console.log('Transformed URL:', transformedUrl);

            // Load the edited image
            const editedImage = await FabricImage.fromURL(transformedUrl, {
                crossOrigin: "anonymous",
            });

            // The AI edit may change dimensions, so we need to handle sizing
            const canvasWidth = canvasEditor.getWidth();
            const canvasHeight = canvasEditor.getHeight();

            // Calculate scale to fit the edited image
            const scaleX = canvasWidth / editedImage.width;
            const scaleY = canvasHeight / editedImage.height;
            const scale = Math.min(scaleX, scaleY, 1); // Don't upscale

            editedImage.set({
                left: canvasWidth / 2,
                top: canvasHeight / 2,
                originX: "center",
                originY: "center",
                scaleX: scale,
                scaleY: scale,
                selectable: true,
                evented: true,
            });

            // Copy filters if they exist
            if (imageObject.filters && imageObject.filters.length > 0) {
                editedImage.filters = [...imageObject.filters];
                editedImage.applyFilters();
            }

            // Remove old image and add edited image
            canvasEditor.remove(imageObject);
            canvasEditor.add(editedImage);
            canvasEditor.centerObject(editedImage);
            canvasEditor.setActiveObject(editedImage);
            canvasEditor.requestRenderAll();

            // Save to database
            const canvasJSON = canvasEditor.toJSON();
            await updateProject({
                projectId: project._id,
                canvasState: canvasJSON,
                currentImageUrl: transformedUrl,
            });

            toast.success("Image edited successfully with AI!");
            setPrompt(""); // Clear prompt after successful edit
        } catch (error) {
            console.error("Error editing image:", error);
            toast.error("Failed to edit image. The AI service may be unavailable or the prompt may be invalid.");
        } finally {
            setProcessingMessage(null);
        }
    };

    if (!canvasEditor) {
        return (
            <div className="p-4">
                <p className="text-white/70 text-sm">
                    Load an image to start editing
                </p>
            </div>
        );
    }

    const activeImage = getActiveImage();
    if (!activeImage) {
        return (
            <div className="p-4">
                <p className="text-white/70 text-sm">
                    Select an image to edit with AI
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Description */}
            <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-white/70">
                    Modify the contents of your image using AI by describing the changes you want to make.
                </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
                <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-300 space-y-2">
                    <p><strong>Note:</strong> Output dimensions will be:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>1024×1024 for square images</li>
                        <li>1536×1024 or 1024×1536 for rectangular images</li>
                    </ul>
                    <p className="mt-2">The shorter side will be padded with appropriate content.</p>
                </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                    Describe your edit
                </label>
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., 'add some flair to this plain cake' or 'make the sky more dramatic'"
                    className="min-h-[120px] bg-slate-800 border-slate-700 text-white placeholder:text-white/40 resize-none"
                    disabled={processingMessage}
                />
                <p className="text-xs text-white/50">
                    Be specific and descriptive for best results
                </p>
            </div>

            {/* Example Prompts */}
            <div className="space-y-2">
                <label className="text-xs font-medium text-white/70">
                    Example prompts:
                </label>
                <div className="space-y-2">
                    {[
                        "add colorful decorations",
                        "make the background more vibrant",
                        "add some flowers in the foreground",
                        "change the lighting to sunset",
                    ].map((example, index) => (
                        <button
                            key={index}
                            onClick={() => setPrompt(example)}
                            disabled={processingMessage}
                            className="w-full text-left px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded text-xs text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            "{example}"
                        </button>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <Button
                onClick={applyEdit}
                disabled={processingMessage || !prompt.trim()}
                className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
                {processingMessage ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        AI is editing your image...
                    </>
                ) : (
                    <>
                        <Wand2 className="h-4 w-4" />
                        Apply AI Edit
                    </>
                )}
            </Button>

            {/* Warning */}
            <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-xs text-amber-300">
                    <strong>Important:</strong> AI editing may take 10-30 seconds to process. The result will replace your current image.
                </p>
            </div>
        </div>
    );
}