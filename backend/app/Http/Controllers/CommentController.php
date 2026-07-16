<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // GET /api/comments
    public function index()
    {
        return response()->json(
            Comment::with(['user', 'task'])->get()
        );
    }

    // POST /api/comments
    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'comment' => 'required|string',
        ]);

        $comment = Comment::create([
            'task_id' => $validated['task_id'],
            'user_id' => $request->user()->id,
            'comment' => $validated['comment'],
        ]);

        return response()->json([
            'message' => 'Comment added successfully',
            'comment' => $comment->load(['user', 'task'])
        ], 201);
    }

    // GET /api/comments/{comment}
    public function show(Comment $comment)
    {
        return response()->json(
            $comment->load(['user', 'task'])
        );
    }

    // PUT /api/comments/{comment}
    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'comment' => 'required|string',
        ]);

        $comment->update($validated);

        return response()->json([
            'message' => 'Comment updated successfully',
            'comment' => $comment
        ]);
    }

    // DELETE /api/comments/{comment}
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully'
        ]);
    }
}