import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLyric } from "../api/songIdeasApi";

export function useAddLyric() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLyric,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
              // Refresh the specific song detail so the new lyric appears instantly
                queryKey: ['songIdea', variables.ideaId],
            });
        }
    });
}