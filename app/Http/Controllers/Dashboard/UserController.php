<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Users\DeleteUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
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

		if ($request->filled('role')) {
			$roles = explode(',', $request->role);
			$query->whereHas('roles', function ($roleQuery) use ($roles) {
				$roleQuery->whereIn('name', $roles);
			});
		}

		$perPage = $request->get('per_page', 20);
		$users = $query->paginate($perPage);
		$usersData = UserResource::collection($users)->toArray($request);

		return inertia('dashboard/users/Index', [
			'users' => $usersData,
			'pagination' => [
				'current_page' => $users->currentPage(),
				'last_page' => $users->lastPage(),
				'per_page' => $users->perPage(),
				'total' => $users->total(),
				'links' => $users->linkCollection(),
			],
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
    public function destroy(DeleteUserRequest $request, User $user): RedirectResponse
    {
		try {
			if ($request->filled('ids')) {
				$ids = $request->input('ids', []);
				User::whereIn('id', $ids)->delete();
				return back()->with('status', 'success');
			}

			$user->delete();
			return back()->with('status', 'success');
		} catch (\Exception $e) {
			return back()->with('status', 'error');
		}
    }
}
