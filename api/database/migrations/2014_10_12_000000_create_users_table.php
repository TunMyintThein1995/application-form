<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('level');
            $table->string('test_site');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->string('phone');
            $table->string('viber_no');
            $table->string('application_form');
            $table->string('id_card');
            $table->string('photo');
            $table->string('agree');
            $table->string('status', 10)->default('default');
            $table->date('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
