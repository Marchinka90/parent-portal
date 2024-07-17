<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pregnancy;
use App\Models\User;

class PregnancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            // Randomly decide if the user should have a pregnancy
            $havePregnancy = rand(0, 1); // 50% chance
            
            if ($havePregnancy) {
                Pregnancy::factory()->create([
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
