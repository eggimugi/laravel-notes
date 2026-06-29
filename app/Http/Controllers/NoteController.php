<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $sort = $request->string('sort', 'latest')->toString();
        $tag = $request->string('tag')->toString();

        $baseQuery = $request->user()->notes();

        $notes = (clone $baseQuery)
            ->with('tags')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($tag !== '', function ($query) use ($tag) {
                $query->whereHas('tags', function ($q) use ($tag) {
                    $q->where('name', $tag);
                });
            })
            ->when($sort === 'oldest', fn ($query) => $query->oldest())
            ->when($sort === 'title', fn ($query) => $query->orderBy('title'))
            ->when($sort === 'latest', fn ($query) => $query->latest())
            ->get();

        $stats = [
            'total' => (clone $baseQuery)->count(),
            'completed' => (clone $baseQuery)->where('is_completed', true)->count(),
            'in_progress' => (clone $baseQuery)->where('is_completed', false)->count(),
        ];

        $allTags = $request->user()->tags()
            ->orderBy('name')
            ->get();

        return Inertia::render('notes/index', [
            'notes' => $notes,
            'stats' => $stats,
            'allTags' => $allTags,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'tag' => $tag,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'tags' => ['nullable', 'string'],
        ]);

        $note = $request->user()->notes()->create([
            'title' => $validated['title'],
            'content' => $validated['content'] ?? null,
        ]);

        $this->syncTags($request, $note, $validated['tags'] ?? '');

        return redirect()->route('notes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $this->authorizeNote($note);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'is_completed' => ['boolean'],
            'tags' => ['nullable', 'string'],
        ]);

        $note->update([
            'title' => $validated['title'],
            'content' => $validated['content'] ?? null,
            'is_completed' => $validated['is_completed'] ?? false,
        ]);

        $this->syncTags($request, $note, $validated['tags'] ?? '');

        return redirect()->route('notes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $this->authorizeNote($note);

        $note->delete();

        return redirect()->route('notes.index');
    }

    /**
     * Authorize the user for the given note.
     */
    protected function authorizeNote(Note $note)
    {
        abort_unless($note->user_id === request()->user()->id, 403);
    }

    /**
     * Sync tags for the given note.
     */
    private function syncTags(Request $request, Note $note, string $tagsInput): void
    {
        $tagNames = collect(explode(',', $tagsInput))
            ->map(fn (string $name) => trim($name))
            ->filter()
            ->unique();

        $tagIds = $tagNames->map(function (string $name) use ($request) {
            return $request->user()->tags()->firstOrCreate(['name' => $name])->id;
        });

        $note->tags()->sync($tagIds);
    }
}
