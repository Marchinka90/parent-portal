<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Helpers\DateHelper;
use App\Models\User;
use App\Models\Pregnancy;
use App\Models\Child;
use Carbon\Carbon;
use DB;

class StatisticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $numberOfUsers = User::count();
        $numberOfPregnancies = Pregnancy::count();

        $children = Child::select('date_of_birth')->get();
        $numberOfChildren = count($children);
        
        // Number of unique parents
        $numberOfParents = Child::distinct('user_id')->count(); 
        
        // Average number of children per parent
        $averageNumberOfChildrenPerParent = round($numberOfParents > 0 ? $numberOfChildren / $numberOfParents : 0);
        
        // Age distribution of children
        $underOneYear = 0;
        $oneToSixYears = 0;
        $sevenToEighteenYears = 0;
        
        foreach ($children as $child) {
            $ageInYears = Carbon::parse($child->date_of_birth)->age;
            
            if ($ageInYears < 1) {
                $underOneYear++;
            } elseif ($ageInYears >= 1 && $ageInYears <= 6) {
                $oneToSixYears++;
            } elseif ($ageInYears >= 7 && $ageInYears <= 18) {
                $sevenToEighteenYears++;
            }
        }
        
        // Number of pregnancies ending in the next 9 months, distributed by month
        $pregnanciesEndingNextNineMonths = Pregnancy::select('date_of_term')
            ->whereBetween('date_of_term', [Carbon::now(), Carbon::now()->addMonths(9)])
            ->groupBy('date_of_term') 
            ->get()
            ->groupBy(function($date) {
                return Carbon::parse($date->date_of_term)->format('Y-m'); // Group by year and month
            });
        
            
        $pregnancyDistribution = [];
        foreach ($pregnanciesEndingNextNineMonths as $key => $value) {
            $pregnancyDistribution[$key] = count($value);
        }

        
        return Inertia::render('Statistics/Index', [
            'numberOfUsers' => $numberOfUsers,
            'numberOfPregnancies' => $numberOfPregnancies,
            'numberOfChildren' => $numberOfChildren,
            'averageNumberOfChildrenPerParent' => $averageNumberOfChildrenPerParent,
            'childrenDistribution' => [
                'underOneYear' => $underOneYear,
                'oneToSixYears' => $oneToSixYears,
                'sevenToEighteenYears' => $sevenToEighteenYears,
            ],
            'pregnancyDistribution' => $pregnancyDistribution,
        ]);
    }
}
