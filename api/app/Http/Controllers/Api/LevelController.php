<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LevelRequest;
use App\Models\Level;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class LevelController extends Controller
{
    public function list()
    {
        $levels = Level::get();

        return response()->json($levels, 200);
    }

    public function store(LevelRequest $request)
    {
        $level = new Level();
        $level->exam_date = $request->exam_date;
        $level->level = $request->level;
        $level->start_date = $request->start_date;
        $level->end_date = $request->end_date. '23:59:59';
        $level->active = $request->active;
        $level->save();

        return response()->json($level, 201);
    }

    public function view($levelId)
    {
        $level = Level::where('id', $levelId)->where('deleted_at', null)->first();
    
        if ($level === null) {
            return response()->json('level_not_found', 500);
        }

        return response()->json($level, 200);
    }

    
    public function update(LevelRequest $request, $levelId)
    {
        $level = Level::where('id', $levelId)->where('deleted_at', null)->first();

        if ($level === null) {
            return response()->json('level_not_found', 500);
        }

        $level->exam_date = $request->exam_date;
        $level->level = $request->level;
        $level->start_date = $request->start_date;
        $level->end_date = $request->end_date;
        $level->active = $request->active;
        $level->updated_at = Carbon::now();
        $level->update();

        return response()->json($level, 201);
    }

    public function destory($levelId)
    {
        $level = Level::where('id', $levelId)->where('deleted_at', null)->first();

        if ($level === null) {
            return response()->json('level_not_found', 500);
        }

        $level->deleted_at = Carbon::now();
        $level->save();

        return response()->json($level, 200);

    }
}
