<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'level' => 'N3',
            'test_site' => 'Yangon',
            'date_of_birth' => '1999-02-20',
            'gender' => 'Male',
            'phone' => '09-775698312',
            'viber_no' => '09-775698312',
            'application_form' => 'picture1.jpg',
            'id_card' => 'picture2.jpg',
            'photo' => 'picture3.jpg',
            'agree' => 'true'
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
