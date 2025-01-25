<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
		$query = User::query();

		$query->whereNotIn('id', [auth()->id()]);

		if ($request->filled('search')) {
			$query->where(function ($subQuery) use ($request) {
				$subQuery->where('name', 'ilike', '%' . $request->search . '%')
					->orWhere('email', 'like', '%' . $request->search . '%');
			});
		}

		if ($request->filled('email_verified')) {
			$emailVerified = filter_var($request->email_verified, FILTER_VALIDATE_BOOLEAN);
			$query->when($emailVerified, function ($q) {
				$q->whereNotNull('email_verified_at');
			}, function ($q) {
				$q->whereNull('email_verified_at');
			});
		}

		$perPage = $request->get('per_page', 10);
		$users = $query->paginate($perPage);

		return inertia('dashboard/users/Index', [
			'users' => UserResource::collection($users),
			'filters' => $request->only(['search', 'email_verified', 'per_page']),
		]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
