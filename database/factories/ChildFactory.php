<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Child;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Child>
 */
class ChildFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Child::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        // Generate a random date of birth within the range from now to +18 years
        $startDate = now()->subYears(18);
        $endDate = now();
        $randomDate = $this->faker->dateTimeBetween($startDate, $endDate);

        // Generate gender-specific name
        $gender = $this->faker->randomElement(['boy', 'girl']);
        $name = ($gender == 'boy') ? $this->faker->firstNameMale .' '. $this->faker->lastName : $this->faker->firstNameFemale .' '. $this->faker->lastName;

        return [
            'user_id' => User::factory(),
            'name' => $name,
            'gender' => $gender,
            'date_of_birth' => $randomDate->format('Y-m-d'),
        ];
    }
}
