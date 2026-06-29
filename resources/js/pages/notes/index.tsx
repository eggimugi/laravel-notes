import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { destroy, index, update } from '@/routes/notes';
import type { Note, Tag } from '@/types';
import { NoteCreateForm } from './components/note-create-form';
import { NoteEditForm } from './components/note-edit-form';
import { NoteFilters } from './components/note-filter';
import { NoteItem } from './components/note-item';
import StatsSummary from './components/stats-summary';

type Filters = {
    search: string;
    sort: 'latest' | 'oldest' | 'title';
    tag: string;
};

type Stats = {
    total: number;
    completed: number;
    in_progress: number;
};

type Props = {
    notes: Note[];
    stats: Stats;
    allTags: Tag[];
    filters: Filters;
};

export default function Index({ notes, stats, allTags, filters }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [searchInput, setSearchInput] = useState(filters.search);
    const [sort, setSort] = useState(filters.sort);
    const [tagFilter, setTagFilter] = useState(filters.tag);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                index(),
                { search: searchInput, sort, tag: tagFilter },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchInput, sort, tagFilter]);

    function tagsToString(tags: Tag[]): string {
        return tags.map((tag) => tag.name).join(', ');
    }

    function toggleCompleted(note: Note) {
        router.visit(update(note), {
            data: {
                title: note.title,
                content: note.content,
                is_completed: !note.is_completed,
                tags: tagsToString(note.tags),
            },
        });
    }

    function handleDelete(noteId: number) {
        if (confirm('Delete this note?')) {
            router.visit(destroy(noteId));
        }
    }

    return (
        <>
            <Head title="Notes" />
            <div className="flex h-full flex-1 flex-col gap-16 overflow-x-auto rounded-xl p-4">
                <datalist id="tag-suggestions">
                    {allTags.map((tag) => (
                        <option key={tag.id} value={tag.name} />
                    ))}
                </datalist>

                <div className="space-y-3">
                    <StatsSummary stats={stats} />

                    <NoteCreateForm />
                </div>

                <div className="space-y-3">
                    <div className="flex gap-3">
                        <NoteFilters
                            onSearchChange={(e) =>
                                setSearchInput(e.target.value)
                            }
                            sort={sort}
                            onSortChange={(value) =>
                                setSort(value as 'latest' | 'oldest' | 'title')
                            }
                            tagFilter={tagFilter}
                            onTagFilterChange={(value) => setTagFilter(value)}
                            allTags={allTags}
                        />
                    </div>

                    <div className="space-y-3">
                        {notes.length === 0 && (
                            <p className="text-muted-foreground">
                                No notes yet. Add one above!
                            </p>
                        )}

                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="rounded-lg border p-4"
                            >
                                {editingId === note.id ? (
                                    <NoteEditForm
                                        note={note}
                                        onCancel={() => setEditingId(null)}
                                        onSuccess={() => setEditingId(null)}
                                    />
                                ) : (
                                    <NoteItem
                                        note={note}
                                        onToggleCompleted={toggleCompleted}
                                        onEdit={() => setEditingId(note.id)}
                                        onDelete={handleDelete}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Notes',
            href: index(),
        },
    ],
};
