<?php
namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        // Retrieve the authenticated user's ID
        $userId = Auth::id(); // This will get the ID of the currently authenticated user

        // Validate incoming data
        $validated = $request->validate([
            'plan_name' => 'required|string|max:191',
            'price' => 'required|numeric',
            'started_at' => 'required|date',
            'expires_at' => 'required|date',
        ]);

        // Use Stripe for payment processing

        try {
            // Create a new subscription record
            $subscription = Subscription::create([
                'user_id' => $userId,
                'plan_name' => $validated['plan_name'],
                'price' => $validated['price'],
                'started_at' => $validated['started_at'],
                'expires_at' => $validated['expires_at'],
            ]);

            return response()->json([
                'message' => 'Subscription successfully created!',
                'subscription' => $subscription
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating subscription',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function cancelSubscription(Request $request)
    {
        // Retrieve the authenticated user's ID
        $userId = Auth::id(); // This will get the ID of the currently authenticated user

        // Retrieve the user's active subscription
        $subscription = Subscription::where('user_id', $userId)
                                    ->whereNull('canceled_at') // Ensure subscription isn't already canceled
                                    ->first();

        if (!$subscription) {
            return response()->json([
                'error' => 'No active subscription found.'
            ], 404);
        }

        try {
            // Mark the subscription as canceled
            $subscription->update(['canceled_at' => now()]);

            return response()->json([
                'message' => 'Subscription successfully canceled.',
                'subscription' => $subscription
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error canceling subscription',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
