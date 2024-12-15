<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;
use App\Models\Show;

class ShowSeeder extends Seeder
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

        // genre data with relationships
        $shows = [
            [
                'title' => 'Stranger Things',
                'description' => 'A young girl with extraordinary powers helps a group of friends find a missing child in a supernatural mystery.',
                'release_date' => 2016,
                'is_popular' => true,
                'image_url' => '/images/stranger-things.jpg',  // Corrected image URL
                'video_url' => 'https://www.youtube.com/embed/mnd7sFt5c3A',
                'genres' => [$action->id, $sciFi->id],
            ],
            [
                'title' => 'Breaking Bad',
                'description' => 'A high school chemistry teacher turned methamphetamine producer partners with a former student to create and sell high-quality meth.',
                'release_date' => 2008,
                'is_popular' => true,
                'image_url' => '/images/breaking-bad.jpg',  // Corrected image URL
                'video_url' => 'https://www.youtube.com/embed/HhesaQXLuRY',
                'genres' => [$action->id, $sciFi->id],
            ],
            [
                'title' => 'The Crown',
                'description' => 'A drama series about the reign of Queen Elizabeth II of the United Kingdom, exploring her relationships with her family, country, and advisors.',
                'release_date' => 2016,
                'is_popular' => true,
                'image_url' => '/images/the-crown.jfif',  // Corrected image URL
                'video_url' => 'https://www.youtube.com/embed/JWtnJjn6ng0',
                'genres' => [$action->id, $sciFi->id],

            ],
            [
                'title' => 'Black Mirror',
                'description' => 'An anthology series that explores a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
                'release_date' => 2011,
                'is_popular' => false,
                'image_url' => '/images/black-mirror.jpg',  // Corrected image URL
                'video_url' => 'https://www.youtube.com/embed/-qIlCo9yqpY',
                'genres' => [$sciFi->id, $drama->id],
            ],
            [
                'title' => 'From',
                'description' => 'Unravel the mystery of a city in middle U.S.A. that imprisons everyone who enters. As the residents struggle to maintain a sense of normality and seek a way out, they must also survive the threats of the surrounding forest.',
                'release_date' => 2022,
                'is_popular' => false,
                'image_url' => '/images/from.jfif',  // Corrected image URL
                'video_url' => 'https://www.youtube.com/embed/pDHqAj4eJcM',
                'genres' => [$action->id],
            ],
            [
                'title' => 'Manifest',
                'description' => 'When a commercial airliner suddenly reappears after being missing for five years, those aboard must reintegrate into society.',
                'release_date' => 2018,
                'is_popular' => true,
                'image_url' => '/images/manifest.jpg',  // Corrected image URL
                'video_url' => 'https://www.youtube.com/embed/I1hNAIzkQWY',
                'genres' => [$action->id],
            ],


        ];

        // Create genres and attach genres
        foreach ($shows as $showData) {
            $show = Show::create([
                'title' => $showData['title'],
                'description' => $showData['description'],
                'release_date' => $showData['release_date'],
                'is_popular' => $showData['is_popular'],
                'image_url' => $showData['image_url'],
                'video_url' => $showData['video_url'],
            ]);

            $show->genres()->attach($showData['genres']);
        }
    }
}
