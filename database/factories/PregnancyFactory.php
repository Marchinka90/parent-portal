<?php

namespace Database\Factories;

use App\Models\Pregnancy;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pregnancy>
 */
class PregnancyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pregnancy::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        // Generate a random term date within the range from now - 120 days to now + 120 days
        $startDate = now()->subDays(80);
        $endDate = now()->addDays(160);
        $termDate = $this->faker->dateTimeBetween($startDate, $endDate);

        // Generate random number of babies (up to 5)
        $numberOfBabies = rand(1, 5);
        $babies = [];

        for ($i = 1; $i <= $numberOfBabies; $i++) {
            $gender = $this->faker->randomElement(['boy', 'girl', 'unknown']);
            $babies[] = [
                'gender' => $gender,
            ];
        }

        return [
            'user_id' => User::factory(),
            'date_of_term' => $termDate->format('Y-m-d'),
            'babies' => json_encode($babies),
        ];
    }
}
