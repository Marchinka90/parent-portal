<?php

namespace App\Helpers;

use Carbon\Carbon;

class DateHelper
{
    public static function daysLeftToTerm(string $dateOfTerm): int
    {
        $termDate = Carbon::parse($dateOfTerm);
        $now = Carbon::now();

        return (integer)$now->diffInDays($termDate);
    }

    public static function calculateAge(string $dateOfBirth): array
    {
        $birthDate = Carbon::parse($dateOfBirth);
        $now = Carbon::now();

        $years = (integer)abs($now->diffInYears($birthDate));
        $months = 0;

        if ($years === 0) {
          $months = (integer)abs($now->diffInMonths($birthDate));
        }
        
      return ['years' => $years, 'months' => $months];
    }
}