// hooks/use-plan-access.js

export function usePlanAccess() {
    // Free version
    const planAccess = {
        resize: true,
        crop: true,
        flip: true,
        adjust: true,
        text: true,
        background: true,
        ai_extender: true,
        ai_edit: true,
        edit_image: true,
    };

    const hasAccess = () => true;
    const getRestrictedTools = () => [];
    const canCreateProject = () => true;
    const canExport = () => true;

    return {
        userPlan: "free_user",
        isPro: true,   //  allowed
        isFree: false,
        hasAccess,
        planAccess,
        getRestrictedTools,
        canCreateProject,
        canExport,
    };
}
