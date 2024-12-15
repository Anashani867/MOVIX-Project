<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Genre;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure genres exist
        $action = Genre::firstOrCreate(['name' => 'Action']);
        $sciFi = Genre::firstOrCreate(['name' => 'Sci-Fi']);
        $drama = Genre::firstOrCreate(['name' => 'Drama']);
        $thriller = Genre::firstOrCreate(['name' => 'Thriller']);

        // Movie data with relationships
        $movies = [
            [
                'title' => 'The Matrix',
                'description' => 'A hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                'release_date' => 1999,
                'is_popular' => true,
                'image_url' => '/images/thematrixx.jpg', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/vKQi3bBA1y8',
                'movie_url' => 'https://vidsrc.net/embed/tt0133093/', // Second video URL


                'genres' => [$action->id, $sciFi->id],
            ],  
            [
                'title' => 'Inception',
                'description' => 'A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into the mind of a CEO.',
                'release_date' => 2010,
                'is_popular' => true,
                'image_url' => '/images/the-inception.jfif', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/YoHD9XEInc0',
                'movie_url' => 'https://vidsrc.net/embed/tt1375666/', // Second video URL

                'genres' => [$action->id, $sciFi->id],
            ],
            [
                'title' => 'The Dark Knight',
                'description' => 'When the menace known as The Joker emerges, he wreaks havoc on the people of Gotham.',
                'release_date' => 2008,
                'is_popular' => true,
                'image_url' => '/images/darknightt.jpg', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/EXeTwQWrcwY',
                'movie_url' => 'https://vidsrc.net/embed/tt0468569/', // Second video URL

                'genres' => [$action->id, $thriller->id],
            ],
            [
                'title' => 'Interstellar',
                'description' => 'Explorers travel through a wormhole in space to ensure humanity’s survival.',
                'release_date' => 2014,
                'is_popular' => false,
                'image_url' => '/images/maxresdefault.jpg', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/2LqzF5WauAw',
                'movie_url' => 'https://vidsrc.net/embed/tt0816692/', // Second video URL

                'genres' => [$sciFi->id, $drama->id],
            ],
            [
                'title' => 'Extraction 2',
                'description' => 'After barely surviving his wounds, Tyler Rake is back for another mission.',
                'release_date' => 2023,
                'is_popular' => true,
                'image_url' => '/images/extraction.jpg', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/Y274jZs5s7s',
                'movie_url' => 'https://vidsrc.net/embed/tt12263384/', // Second video URL

                'genres' => [$action->id],
            ],
            [
                'title' => 'Lift',
                'description' => 'A master thief and his ex-girlfriend team up to steal gold bullion on a passenger flight.',
                'release_date' => 2024,
                'is_popular' => true,
                'image_url' => '/images/lift.jpg', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/m2L-Sa_6MU0',
                'movie_url' => 'https://vidsrc.net/embed/tt14371878/', // Second video URL

                'genres' => [$action->id],
            ],
            [
                'title' => 'Red Notice',
                'description' => 'An Interpol agent tracks a notorious art thief with a rival thief’s help.',
                'release_date' => 2021,
                'is_popular' => true,
                'image_url' => '/images/rednotice.jpg', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/T6l3mM7AWew',
                'movie_url' => 'https://vidsrc.net/embed/tt7991608/', // Second video URL

                'genres' => [$action->id],
            ],
            [
                'title' => '6 Underground',
                'description' => 'A vigilante team stages a coup d’état against a dictator.',
                'release_date' => 2019,
                'is_popular' => true,
                'image_url' => '/images/1178893.jpg', // Corrected path
                'video_url' => 'https://www.youtube.com/embed/YLE85olJjp8',
                'movie_url' => 'https://vidsrc.net/embed/tt8106534/', // Second video URL

                'genres' => [$action->id],
            ],
        ];

        // Create movies and attach genres
        foreach ($movies as $movieData) {
            $movie = Movie::create([
                'title' => $movieData['title'],
                'description' => $movieData['description'],
                'release_date' => $movieData['release_date'],
                'is_popular' => $movieData['is_popular'],
                'image_url' => $movieData['image_url'],
                'video_url' => $movieData['video_url'],
                'movie_url' => $movieData['movie_url'],
            ]);

            $movie->genres()->attach($movieData['genres']);
        }
    }
}
