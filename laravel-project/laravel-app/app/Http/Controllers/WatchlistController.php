<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use App\Models\Movie;
use App\Models\Show; // Assuming you have a Show model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    /**
     * Add a movie or show to the user's watchlist.
     */
    public function addToWatchlist(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json([
                'error' => 'User is not authenticated. Please login to add movies or shows to your watchlist.'
            ], 401);
        }

        // Validate incoming request
        $request->validate([
            'movie_id' => 'nullable|exists:movies,id',
            'show_id' => 'nullable|exists:shows,id',
            'premium_movie_id' => 'nullable|exists:premium_movies,id', // Add validation for premium_movie_id
        ]);

        try {
            $existingWatchlistItem = null;

            // Handle adding a movie
            if ($request->has('movie_id')) {
                $existingWatchlistItem = Watchlist::where('user_id', $userId)
                    ->where('movie_id', $request->movie_id)
                    ->first();

                if (!$existingWatchlistItem) {
                    $watchlist = Watchlist::create([
                        'user_id' => $userId,
                        'movie_id' => $request->movie_id,
                    ]);
                }
            }

            // Handle adding a show
            if ($request->has('show_id')) {
                $existingWatchlistItem = Watchlist::where('user_id', $userId)
                    ->where('show_id', $request->show_id)
                    ->first();

                if (!$existingWatchlistItem) {
                    $watchlist = Watchlist::create([
                        'user_id' => $userId,
                        'show_id' => $request->show_id,
                    ]);
                }
            }

            // Handle adding a premium movie
            if ($request->has('premium_movie_id')) {
                $existingWatchlistItem = Watchlist::where('user_id', $userId)
                    ->where('premium_movie_id', $request->premium_movie_id)
                    ->first();

                if (!$existingWatchlistItem) {
                    $watchlist = Watchlist::create([
                        'user_id' => $userId,
                        'premium_movie_id' => $request->premium_movie_id,
                    ]);
                }
            }

            // If the item is already in the watchlist, return the appropriate response
            if ($existingWatchlistItem) {
                return response()->json([
                    'message' => 'Movie/Show/Premium movie is already in your watchlist.',
                    'watchlist' => $existingWatchlistItem,
                ]);
            }

            // If successfully added to the watchlist
            return response()->json([
                'message' => 'Movie/Show/Premium movie added to watchlist successfully.',
                'watchlist' => $watchlist,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to add movie/show/premium movie to watchlist.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get the movies or shows in the user's watchlist.
     */
    public function getWatchlist()
    {
        try {
            $userId = Auth::id();

            // Check if the user is authenticated
            if (!$userId) {
                return response()->json([
                    'error' => 'User is not authenticated.'
                ], 401); // Unauthorized status
            }

            // Retrieve the watchlist with related movie, show, and premium movie if available
            $watchlist = Watchlist::where('user_id', $userId)
                ->with(['movie', 'show', 'premium_movie'])
                ->get();

            // If the watchlist is empty
            if ($watchlist->isEmpty()) {
                return response()->json([
                    'message' => 'Your watchlist is empty.',
                ]);
            }

            // Return the watchlist data as a response
            return response()->json($watchlist);

        } catch (\Exception $e) {
            // Handle any errors and return a 500 response
            return response()->json([
                'error' => 'Failed to retrieve watchlist.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove a movie or show from the user's watchlist.
     */
    public function destroy($id)
    {
        $userId = Auth::id();

        // Check for movie_id, show_id, or premium_movie_id in the watchlist
        $watchlistItem = Watchlist::where('user_id', $userId)
            ->where(function($query) use ($id) {
                $query->where('movie_id', $id)
                      ->orWhere('show_id', $id)
                      ->orWhere('premium_movie_id', $id); // Premium movie handling
            })
            ->first();

        // Handle deletion
        if ($watchlistItem) {
            $watchlistItem->delete();
            return response()->json(['message' => 'Item removed from watchlist'], 200);
        }

        return response()->json(['message' => 'Item not found in the watchlist'], 404);
    }
}
