<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChildRequest;
use App\Http\Requests\UpdateChildRequest;
use Illuminate\Support\Facades\Auth;
use App\Helpers\DateHelper;
use App\Models\Child;
use Inertia\Inertia;

class ChildrenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user()->load([
            'children' => function ($query) {
                $query->select('id', 'user_id', 'name', 'gender', 'date_of_birth');
                $query->orderBy('date_of_birth', 'desc');
            }
        ]);
    
        
        if (!empty($user->children)) {
            foreach ($user->children as $key => $child) {
                unset($child['user_id']);
                $child['age'] = DateHelper::calculateAge($child->date_of_birth);          
            }
        }
        
        return Inertia::render('Children/Index', [
            'children' => $user->children,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Children/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChildRequest $request)
    {
        $validatedData = $request->validated();

        $child = new Child();
        $child->name = $validatedData['name'];
        $child->date_of_birth = $validatedData['dateOfBirth'];
        $child->gender = $validatedData['gender'];
        $child->user_id = Auth::user()->id;
        $child->save();

        return redirect()->route('children.index')->with('success', 'Child created successfully.');
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
        $child = Child::where('id', $id)->select('id', 'name', 'date_of_birth', 'gender')->first();
        
        if(!$child) {
            return redirect()->route('children.index')->withErrors('Child not found.');
        }

        return Inertia::render('Children/Edit', [
            'child' => $child,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChildRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $child = Child::where('id', $id)->first();
        
        if(!$child) {
            return redirect()->route('children.index')->withErrors('Child not found.');
        }
        
        if ($child->user_id != Auth::user()->id) {
            return redirect()->route('children.index')->withErrors('Unauthorized action.');
        }

        $child->update([
            'name' => $validatedData['name'],
            'gender' => $validatedData['gender'],
            'date_of_birth' => $validatedData['dateOfBirth'],
        ]);

        return redirect()->route('children.index')->with('success', 'Child updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user()->load([
            'children' => function ($query) {
                $query->select('id', 'user_id', 'name', 'gender', 'date_of_birth');
                $query->orderBy('date_of_birth', 'desc');
            }
        ]);

        if (empty($user->children)) {
            return redirect()->route('children.index')->withErrors('No children created');
        }
        
        $childIndex = -1;
        foreach ($user->children as $index => $child) {
            if ($child->id == $id) {
                $childIndex = $index;
            }
        }

        if ($childIndex < 0) {
            return redirect()->route('children.index')->withErrors('Unauthorized action.');
        }
        
        $user->children[$childIndex]->delete();
        
        return redirect()->route('children.index')->with('success', 'Child deleted successfully.');
    }
}
