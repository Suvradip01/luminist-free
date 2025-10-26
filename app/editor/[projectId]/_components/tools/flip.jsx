"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FlipHorizontal, FlipVertical, Loader2 } from "lucide-react";
import { useCanvas } from "@/context/context";
import { toast } from "sonner";
import { FabricImage } from "fabric";
import { useConvexMutation } from "@/components/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";

export function FlipControls({ project }) {
    const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();
    const [flipType, setFlipType] = useState(null);

    const { mutate: updateProject } = useConvexMutation(api.projects.updateProject);

    const getActiveImage = () => {
        if (!canvasEditor) return null;
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject && activeObject.type === "image") return activeObject;
        const objects = canvasEditor.getObjects();
        return objects.find((obj) => obj.type === "image") || null;
    };

    const buildImageKitUrl = (baseUrl, newFlip) => {
        // Parse ImageKit URL structure
        // Expected format: https://ik.imagekit.io/account/tr:transformations/path/to/file.jpg

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
                existingTransformations = parts[i].substring(3); // Remove 'tr:' prefix
                break;
            }
        }

        // Remove any existing flip transformations
        if (existingTransformations) {
            const transforms = existingTransformations.split(',');
            const filteredTransforms = transforms.filter(t => !t.startsWith('fl-'));
            existingTransformations = filteredTransforms.join(',');
        }

        // Add new flip transformation
        let newTransformations = existingTransformations
            ? `${existingTransformations},fl-${newFlip}`
            : `fl-${newFlip}`;

        // Rebuild URL
        if (trIndex !== -1) {
            // Replace existing tr: part
            parts[trIndex] = `tr:${newTransformations}`;
        } else {
            // Insert tr: after account name (first part)
            parts.splice(1, 0, `tr:${newTransformations}`);
        }

        // Reconstruct the URL
        urlObj.pathname = '/' + parts.join('/');
        return urlObj.toString();
    };

    const applyFlip = async (flipDirection) => {
        if (!canvasEditor || !project) {
            toast.error("Canvas not ready");
            return;
        }

        const imageObject = getActiveImage();
        if (!imageObject) {
            toast.error("Please select an image to flip");
            return;
        }

        const flipTypeText =
            flipDirection === "h" ? "horizontally" :
                flipDirection === "v" ? "vertically" :
                    "in both directions";

        setProcessingMessage(`Flipping image ${flipTypeText}...`);
        setFlipType(flipDirection);

        try {
            // Get current image URL
            const currentImageUrl = imageObject.getSrc();

            // Build new ImageKit URL with flip transformation
            const transformedUrl = buildImageKitUrl(currentImageUrl, flipDirection);

            console.log('Original URL:', currentImageUrl);
            console.log('Transformed URL:', transformedUrl);

            // Load the flipped image
            const flippedImage = await FabricImage.fromURL(transformedUrl, {
                crossOrigin: "anonymous",
            });

            // Preserve the position and scale of the original image
            flippedImage.set({
                left: imageObject.left,
                top: imageObject.top,
                scaleX: imageObject.scaleX,
                scaleY: imageObject.scaleY,
                angle: imageObject.angle,
                originX: imageObject.originX,
                originY: imageObject.originY,
                selectable: true,
                evented: true,
            });

            // Copy filters if they exist
            if (imageObject.filters && imageObject.filters.length > 0) {
                flippedImage.filters = [...imageObject.filters];
                flippedImage.applyFilters();
            }

            // Remove old image and add flipped image
            canvasEditor.remove(imageObject);
            canvasEditor.add(flippedImage);
            canvasEditor.setActiveObject(flippedImage);
            canvasEditor.requestRenderAll();

            // Save to database
            const canvasJSON = canvasEditor.toJSON();
            await updateProject({
                projectId: project._id,
                canvasState: canvasJSON,
                currentImageUrl: transformedUrl,
            });

            toast.success(`Image flipped ${flipTypeText}!`);
        } catch (error) {
            console.error("Error flipping image:", error);
            toast.error("Failed to flip image. Please try again.");
        } finally {
            setProcessingMessage(null);
            setFlipType(null);
        }
    };

    if (!canvasEditor) {
        return (
            <div className="p-4">
                <p className="text-white/70 text-sm">
                    Load an image to start flipping
                </p>
            </div>
        );
    }

    const activeImage = getActiveImage();
    if (!activeImage) {
        return (
            <div className="p-4">
                <p className="text-white/70 text-sm">
                    Select an image to flip
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Description */}
            <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-white/70">
                    Flip your image horizontally, vertically, or in both directions.
                </p>
            </div>

            {/* Flip Options */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Flip Direction</h3>

                <div className="grid grid-cols-1 gap-3">
                    {/* Horizontal Flip */}
                    <Button
                        onClick={() => applyFlip("h")}
                        disabled={processingMessage}
                        className="w-full h-auto py-4 flex items-center justify-start gap-3 bg-slate-800 hover:bg-slate-700 text-white"
                    >
                        {processingMessage && flipType === "h" ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <FlipHorizontal className="h-5 w-5" />
                        )}
                        <div className="text-left">
                            <div className="font-medium">Flip Horizontal</div>
                            <div className="text-xs text-white/50">
                                Mirror image left to right
                            </div>
                        </div>
                    </Button>

                    {/* Vertical Flip */}
                    <Button
                        onClick={() => applyFlip("v")}
                        disabled={processingMessage}
                        className="w-full h-auto py-4 flex items-center justify-start gap-3 bg-slate-800 hover:bg-slate-700 text-white"
                    >
                        {processingMessage && flipType === "v" ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <FlipVertical className="h-5 w-5" />
                        )}
                        <div className="text-left">
                            <div className="font-medium">Flip Vertical</div>
                            <div className="text-xs text-white/50">
                                Mirror image top to bottom
                            </div>
                        </div>
                    </Button>

                    {/* Both Directions */}
                    <Button
                        onClick={() => applyFlip("h_v")}
                        disabled={processingMessage}
                        className="w-full h-auto py-4 flex items-center justify-start gap-3 bg-slate-800 hover:bg-slate-700 text-white"
                    >
                        {processingMessage && flipType === "h_v" ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <div className="flex gap-1">
                                <FlipHorizontal className="h-5 w-5" />
                                <FlipVertical className="h-5 w-5" />
                            </div>
                        )}
                        <div className="text-left">
                            <div className="font-medium">Flip Both</div>
                            <div className="text-xs text-white/50">
                                Flip horizontally and vertically
                            </div>
                        </div>
                    </Button>
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-xs text-white/70">
                    Flip transformations are applied immediately and saved to your project.
                </p>
            </div>
        </div>
    );
}