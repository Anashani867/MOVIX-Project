<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PremiumMoviesController;

// Public Routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Authentication Check (ensure user is authenticated)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API Routes
Route::middleware(['api'])->group(function () {
    Route::get('/movies', [MovieController::class, 'index']);
    Route::get('/movies/{id}', [MovieController::class, 'show']);
    Route::get('/shows', [ShowController::class, 'index']);
    Route::get('/shows/{id}', [ShowController::class, 'show']);
});

// Subscription Routes (Authentication Required)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('subscribe', [SubscriptionController::class, 'store']);
    Route::post('/cancel-subscription', [SubscriptionController::class, 'cancelSubscription']);
    Route::post('paypal/success', [SubscriptionController::class, 'paypalSuccess'])->name('paypal.success');

});



// Watchlist Routes (Authentication Required)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/watchlist', [WatchlistController::class, 'addToWatchlist']);
    Route::get('/watchlist', [WatchlistController::class, 'getWatchlist']);
    Route::delete('watchlist/{movieId}', [WatchlistController::class, 'destroy']);
    Route::delete('watchlist/{showId}', [WatchlistController::class, 'destroy']); 
    Route::delete('/watchlist/premium/{id}', [WatchlistController::class, 'destroy']);




});

// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/premium-movies', [PremiumMoviesController::class, 'index']);
    Route::get('/premium-movies/{id}', [PremiumMoviesController::class, 'show']); // This route handles individual movie requests.
});

// User Management Routes (Authentication Required)
Route::middleware('auth:sanctum')->group(function () {
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::post('/users/{id}/avatar', [UserController::class, 'updateProfilePicture']);
    Route::put('/user/{id}/update-password', [UserController::class, 'changePassword']);
});

// Public User Routes
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
