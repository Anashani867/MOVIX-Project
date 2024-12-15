<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Show;

class ShowController extends Controller
{
    public function index(Request $request)
    {
        // Get search term from query parameter
        $search = $request->input('search');

        // Filter shows by title (you can add more fields like genre if needed)
        $shows = Show::when($search, function($query, $search) {
            return $query->where('title', 'like', "%{$search}%");
        })->get();

        return response()->json($shows);
    }

    public function show($id)
    {
        $show = Show::with('genres')->find($id); // Make sure 'genres' is the correct relationship
        if ($show) {
            return response()->json($show);
        } else {
            return response()->json(['error' => 'Show not found'], 404);
        }
    }
    
    
    
}
