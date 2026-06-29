import type { Tag } from '@/types';

export type Note = {
    id: number;
    user_id: number;
    title: string;
    content: string | null;
    is_completed: boolean;
    tags: Tag[];
    created_at: string;
    updated_at: string;
};
