<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\PremiumMovie;

class PremiumMoviesSeeder extends Seeder
{
    public function run()
    {
        PremiumMovie::create([
            'id' => 1000,
            'title' => 'Pulp Fiction',
            'description' => 'A 1994 crime drama film directed by Quentin Tarantino.',
            'image_url' => 'https://m.media-amazon.com/images/I/81xDLOtZQPL._AC_SL1500_.jpg',
            'video_url' => 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt0110912'
            ,
            'release_date' => '1994-09-23',  // Release date added
        ]);

        PremiumMovie::create([
            'id' => 1001,
            'title' => 'The Flash',
            'description' => 'A new superhero movie about The Flash, released in 2024.',
            'image_url' => 'https://m.media-amazon.com/images/M/MV5BYmE2NzBjNGUtNTJiMy00N2UxLWEyYzMtYzFjODFhMGZlOTgzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
            'video_url' => 'https://www.youtube.com/watch?v=hebWYacbdvc',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt0439572'
            ,
            'release_date' => '2024-06-25',  // Release date added
        ]);

        PremiumMovie::create([
            'id' => 1002,
            'title' => 'Avatar 3',
            'description' => 'The third installment in the Avatar series, released in 2024.',
            'image_url' => 'https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/01/avatar-3-film-teaser-poster.jpg',
            'video_url' => 'https://www.youtube.com/watch?v=7kEhdZWlqW8',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt1630029'
            ,
            'release_date' => '2024-12-20',  // Release date added
        ]);

        PremiumMovie::create([
            'id' => 1003,
            'title' => 'Guardians of the Galaxy Vol. 3',
            'description' => 'The latest adventure of the Guardians, released in 2024.',
            'image_url' => 'https://i.scdn.co/image/ab67616d0000b273e1beb88cc2d75c77b4987472',
            'video_url' => 'https://www.youtube.com/watch?v=u3V5KDHRQvk',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt6791350'
            ,
            'release_date' => '2024-05-15',  // Release date added
        ]);
        PremiumMovie::create([
            'id' => 1004,
            'title' => 'The Hunger Games: The Ballad of Songbirds and Snakes',
            'description' => 'A prequel to the Hunger Games, set to be released in 2024.',
            'image_url' => 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ0bZDytyC6Z57K1spL2FizRUS9ViJnVRuOArkQoCA4Bg_Lu8WUxcosJ14u3Z7insX-1ZU9',
            'video_url' => 'https://www.youtube.com/watch?v=RDE6Uz73A7g',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt10545296'
            ,
            'release_date' => '2024-11-25',  // Release date added
        ]);

        PremiumMovie::create([
            'id' => 1005,
            'title' => 'Dune: Part Two',
            'description' => 'The second part of the Dune adaptation, set for release in 2024.',
            'image_url' => 'https://filmartgallery.com/cdn/shop/files/Dune-Part-Two-Vintage-Movie-Poster-Original-1-Sheet-27x41_195889ac-3cc9-44c1-a67d-67a0010bbe05.jpg?v=1713927920',
            'video_url' => 'https://www.youtube.com/watch?v=_YUzQa_1RCE',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt15239678'
            ,
            'release_date' => '2024-10-18',  // Release date added
        ]);
        PremiumMovie::create([
            'id' => 1006,
            'title' => 'Mission: Impossible – Dead Reckoning Part One',
            'description' => 'The first part of the latest Mission: Impossible movie, coming in 2024.',
            'image_url' => 'https://images.squarespace-cdn.com/content/v1/5816af52e6f2e15be207b0cd/2b96d7b7-d214-48fc-b626-c2907f712ed2/2023-mission-impossible-dead-reckoning-part-one-4k-6b.jpg',
            'video_url' => 'https://www.youtube.com/watch?v=2m1drlOZSDw',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt9603212'
            ,
            'release_date' => '2024-07-25',  // Release date added
        ]);

        PremiumMovie::create([
            'id' => 1007,
            'title' => 'Smile2',
            'description' => 'A drama directed by Martin Scorsese about the Osage murders, set in 2024.',
            'image_url' => 'https://imageio.forbes.com/specials-images/imageserve/673913700f9ecf46de0fadd0/-Smile-2--partial-poster-/0x0.jpg?format=jpg&crop=2028,1140,x50,y0,safe&width=960',
            'video_url' => 'https://www.youtube.com/watch?v=0HY6QFlBzUY',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt29268110'
            ,
      
            'release_date' => '2024-09-10',  // Release date added
        ]);
        PremiumMovie::create([
            'id' => 1008,
            'title' => 'The Marvels',
            'description' => 'The latest Marvel superhero film, set to release in 2024.',
            'image_url' => 'https://lumiere-a.akamaihd.net/v1/images/p_disneyplusoriginals_themarvels_poster_rebrand_8c17eea5.jpeg',
            'video_url' => 'https://www.youtube.com/watch?v=wS_qbDztgVY',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt10676048'
            ,
            'release_date' => '2024-08-25',  // Release date added
        ]);

        PremiumMovie::create([
            'id' => 1009,
            'title' => 'Indiana Jones 5',
            'description' => 'The fifth installment of the Indiana Jones franchise, expected in 2024.',
            'image_url' => 'https://m.media-amazon.com/images/M/MV5BNDgxYmU5NGYtZGRiMS00MjU5LTkzODEtOTUwYTIzOTIzOGY5XkEyXkFqcGc@._V1_.jpg',
            'video_url' => 'https://www.youtube.com/watch?v=ZfVYgWYaHmE',
            'movie_url'=>   'https://vidsrc.xyz/embed/movie/tt1462764'
            ,
            'release_date' => '2024-05-10',  // Release date added
        ]);
    }
}
