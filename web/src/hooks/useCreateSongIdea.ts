import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSongIdea } from "../api/songIdeasApi";

export function useCreateSong() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSongIdea,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['songIdeas'] });
        },
    });
}