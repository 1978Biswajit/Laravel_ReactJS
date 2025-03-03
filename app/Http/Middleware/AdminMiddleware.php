<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated and has the 'Admin' role
        if (!Auth::check() || !Auth::user()->hasRole('Admin')) {
            // If the user is not an admin, deny access and return 403 Forbidden
            abort(403, 'Unauthorized access');
        }

        // If the user is an admin, allow the request to proceed
        return $next($request);
    }
}
