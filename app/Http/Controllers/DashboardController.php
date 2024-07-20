<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Child;
use App\Models\Pregnancy;
use App\Helpers\DateHelper;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user()->load([
            'pregnancy' => function ($query) {
                $query->select('id', 'user_id', 'date_of_term', 'babies');
            },
            'children' => function ($query) {
                $query->select('id', 'user_id', 'name', 'gender', 'date_of_birth');
                $query->orderBy('date_of_birth', 'desc');
            },
        ]);
    
        
        if (!empty($user->pregnancy)) {
            unset($user->pregnancy['user_id']);
            $user->pregnancy['daysLeft'] = DateHelper::daysLeftToTerm($user->pregnancy->date_of_term);
        }

        if (!empty($user->children)) {
            foreach ($user->children as $key => $child) {
                unset($child['user_id']);
                $child['age'] = DateHelper::calculateAge($child->date_of_birth);          
            }
        }
        
        return Inertia::render('Dashboard', [
            'pregnancy' => $user->pregnancy,
            'children' => $user->children,
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
