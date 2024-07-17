<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Child;
use App\Models\User;
use Illuminate\Support\Str;

class ChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $numberOfChildren = rand(0, 5);
            if ($numberOfChildren > 0) {
                Child::factory()->count($numberOfChildren)->create([
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
