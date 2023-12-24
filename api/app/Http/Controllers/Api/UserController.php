<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateFormRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function applyForm(CreateFormRequest $request)
    {
        //1000ユーザーに制限時間
        $end_date = '2022-06-30 10:00:00';
        $today = Carbon::now();
        $users = User::count()+1;

        if($users <= 10 && $end_date >= $today)
        {
            if($request->hasFile('application_form')){
                $fileNameWithExt = $request->file('application_form')->getClientOriginalName();
                $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
                $fileExt = $request->file('application_form')->getClientOriginalExtension();
                $application_form = $fileName.'.'.$fileExt;
                $path = $request->file('application_form')->storeAs('public/images/'.$users, $application_form);
            }
            if($request->hasFile('id_card')){
                $fileNameWithExt = $request->file('id_card')->getClientOriginalName();
                $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
                $fileExt = $request->file('id_card')->getClientOriginalExtension();
                $id_card = $fileName.'.'.$fileExt;
                $path = $request->file('id_card')->storeAs('public/images/'.$users, $id_card);
            }
            if($request->hasFile('photo')){
                $fileNameWithExt = $request->file('photo')->getClientOriginalName();
                $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
                $fileExt = $request->file('photo')->getClientOriginalExtension();
                $photo = $fileName.'.'.$fileExt;
                $path = $request->file('photo')->storeAs('public/images/'.$users, $photo);
            }
            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'level' => $request->level,
                'test_site' => $request->test_site,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'viber_no' => $request->viber_no,
                'application_form' => $application_form ?? '',
                'id_card' => $id_card ?? '',
                'photo' => $photo ?? '',
                'agree' => $request->agree
            ]);
            $user->save();
    
            return response()->json($user, 201);
        }
        else {
            return response()->json('Over Limit User or Over Time', 500);
        }
    }

    public function list ()
    {
        $users = User::get();

        return response()->json($users, 200);
    }

    public function detail(Request $request, $userId)
    {
        $user = User::where('user_id', $userId)->where('deleted_at', null)->first();

        if ($user === null) {
            return response()->json('user_not_found', 401);
        }

        return response()->json($user, 200);
    }

    public function changeStatus($userId)
    {
        $user = User::where('user_id', $userId)->where('deleted_at', null)->first();

        if ($user === null) {
            return response()->json('user_not_found', 401);
        }

        $user->status = 'approve'; 
        $user->update();

        return response()->json($user, 200);

    }
}
