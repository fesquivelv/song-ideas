import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

export const useRealTimeData = <T extends { id: string }>(collectionName: string) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        const q = query(collection(db, collectionName));
        const unsubscribe = onSnapshot( q,  (snapshot) => {
            const items: T[] = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() } as T);
            });

            setData(items);
            setLoading(false);
        }   , (err) => {
            setError(err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [collectionName]);   

    return { data, loading, error };
};