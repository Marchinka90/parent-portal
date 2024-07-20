<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Http\Requests\StorePregnancyRequest;
use App\Http\Requests\UpdatePregnancyRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Helpers\DateHelper;
use App\Models\Pregnancy;

class PregnancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user()->load(['pregnancy' => function ($query) {
            $query->select('id', 'user_id', 'date_of_term', 'babies');
        }]);
    
        
        if (!empty($user->pregnancy)) {
            unset($user->pregnancy['user_id']);
            $user->pregnancy['daysLeft'] = DateHelper::daysLeftToTerm($user->pregnancy->date_of_term);
            $user->pregnancy->babies = json_decode($user->pregnancy->babies);
        }
        
        return Inertia::render('Pregnancy/Index', [
            'pregnancy' => $user->pregnancy,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pregnancy/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePregnancyRequest $request)
    {
        $validatedData = $request->validated();

        $isPregnancy = Pregnancy::where('user_id', Auth::user()->id)->first();
        
        if($isPregnancy) {
            return redirect()->route('pregnancy.index')->withErrors('User can have only one active Pregnancy created.');
        }

        $pregnancy = new Pregnancy();
        $pregnancy->date_of_term = $validatedData['dateOfTerm'];
        $pregnancy->babies = json_encode($validatedData['babies']); // Assuming you store babies as JSON
        $pregnancy->user_id = Auth::user()->id; // Assuming the pregnancy is linked to the authenticated user
        $pregnancy->save();

        return redirect()->route('pregnancy.index')->with('success', 'Pregnancy created successfully.');
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
        $pregnancy = Pregnancy::where('id', $id)
                            ->select('id', 'date_of_term', 'babies')
                            ->first();
        
        if(!$pregnancy) {
            return redirect()->route('pregnancy.index')->withErrors('User can have only one active Pregnancy created.');
        }

        $pregnancy->babies = json_decode($pregnancy->babies);
        return Inertia::render('Pregnancy/Edit', [
            'pregnancy' => $pregnancy,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePregnancyRequest $request, string $id)
    {
        $user = Auth::user();

        if ($user->pregnancy->id != $id) {
            return redirect()->route('pregnancy.index')->withErrors('Unauthorized action.');
        }

        $validatedData = $request->validated();

        $user->pregnancy->update([
            'date_of_term' => $validatedData['dateOfTerm'],
            'babies' => json_encode($validatedData['babies'])
        ]);

        return redirect()->route('pregnancy.index')->with('success', 'Pregnancy updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user();

        if ($user->pregnancy->id != $id) {
            return redirect()->route('pregnancy.index')->withErrors('Unauthorized action.');
        }
        
        $user->pregnancy->delete();
        
        return redirect()->route('pregnancy.index')->with('success', 'Pregnancy deleted successfully.');
    }
}
