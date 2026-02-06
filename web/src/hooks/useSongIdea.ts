import { useQuery } from "@tanstack/react-query";
import { fetchSongIdeaDetail } from "../api/songIdeasApi";

export function useSongIdea(id: string) {
    return useQuery({
        queryKey: ['songIdea', id],
        queryFn: () => fetchSongIdeaDetail(id),
        enabled: !!id,
    });
}
