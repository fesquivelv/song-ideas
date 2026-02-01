import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecording } from "../api/songIdeasApi";

export function useAddRecording() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createRecording,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
              // Refresh the specific song detail so the new recording appears instantly
                queryKey: ['songIdea', variables.ideaId],
            });
        },
    });
}
