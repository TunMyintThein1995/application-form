<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestSitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('test_sites', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('level_id')->unsigned();
            $table->foreign('level_id')->references('id')->on('levels')->nullable();
            $table->string('test_site');
            $table->integer('count');
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
        Schema::dropIfExists('test_sites');
    }
}
