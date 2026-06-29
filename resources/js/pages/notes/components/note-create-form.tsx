import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/notes';

export function NoteCreateForm() {
    return (
        <Form
            {...store.form()}
            resetOnSuccess
            disableWhileProcessing
            className="space-y-3 rounded-lg border p-4"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" placeholder="Note title" />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Content (optional)</Label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="Note content"
                            rows={3}
                        />
                        <InputError message={errors.content} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            name="tags"
                            placeholder="Note tags (comma-separated)"
                            list="tag-suggestions"
                        />
                        <InputError message={errors.tags} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing && <Spinner />}
                        Add Note
                    </Button>
                </>
            )}
        </Form>
    );
}