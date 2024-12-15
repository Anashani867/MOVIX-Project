<?php
  // app/Http/Controllers/MovieController.php
  namespace App\Http\Controllers;

  use App\Models\Movie;
  use Illuminate\Http\Request;

  class MovieController extends Controller
  {public function index(Request $request)
      {
          $search = $request->input('search');
          $isPopular = $request->input('is_popular'); // Get the is_popular filter

          $movies = Movie::when($search, function($query, $search) {
                  return $query->where('title', 'like', "%{$search}%");
              })
              ->when($isPopular !== null, function($query) use ($isPopular) {
                  return $query->where('is_popular', $isPopular);
              })
              ->get();

          return response()->json($movies);
      }

      public function show($id)
      {
          // Fetch the movie along with its genres using eager loading
          $movie = Movie::with('genres')->find($id);

          // Check if the movie exists
          if ($movie) {
              return response()->json($movie);
          } else {
              return response()->json(['error' => 'Movie not found'], 404);
          }
      }


  }