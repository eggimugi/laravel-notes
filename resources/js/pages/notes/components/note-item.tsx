import { Button } from '@/components/ui/button';
import type { Note } from '@/types';

type NoteItemProps = {
    note: Note;
    onToggleCompleted: (note: Note) => void;
    onEdit: (noteId: number) => void;
    onDelete: (noteId: number) => void;
};

export function NoteItem({
    note,
    onToggleCompleted,
    onEdit,
    onDelete,
}: NoteItemProps) {
    return (
        <div
            className="flex cursor-pointer items-start justify-between gap-3"
            onClick={() => onToggleCompleted(note)}
        >
            <div className="flex flex-1 items-start gap-2">
                <input
                    type="checkbox"
                    checked={note.is_completed}
                    onChange={() => onToggleCompleted(note)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                />
                <div>
                    <h3
                        className={
                            note.is_completed
                                ? 'font-semibold text-muted-foreground line-through'
                                : 'font-semibold'
                        }
                    >
                        {note.title}
                    </h3>
                    {note.content && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {note.content}
                        </p>
                    )}
                    {note.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {note.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div
                className="flex shrink-0 gap-2"
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(note.id)}
                >
                    Edit
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}
