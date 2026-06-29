import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/routes/notes';
import type { Note } from '@/types';

type NoteEditFormProps = {
    note: Note;
    onCancel: () => void;
    onSuccess: () => void;
};

export function NoteEditForm({ note, onCancel, onSuccess }: NoteEditFormProps) {
    return (
        <Form
            {...update.form(note)}
            disableWhileProcessing
            onSuccess={onSuccess}
            className="space-y-2"
        >
            {({ processing, errors }) => (
                <>
                    <Input name="title" defaultValue={note.title} />
                    <InputError message={errors.title} />

                    <Textarea
                        name="content"
                        defaultValue={note.content ?? ''}
                        rows={3}
                    />

                    <Input
                        name="tags"
                        defaultValue={note.tags
                            .map((tag) => tag.name)
                            .join(', ')}
                        placeholder="Note tags (comma-separated)"
                        list="tag-suggestions"
                    />
                    <InputError message={errors.tags} />

                    <input
                        type="hidden"
                        name="is_completed"
                        value={note.is_completed ? '1' : '0'}
                    />

                    <div className="flex gap-2">
                        <Button type="submit" size="sm" disabled={processing}>
                            {processing && <Spinner />}
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
