<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use Illuminate\Http\Request;
use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function list()
    {
        $admins = Admin::get();
        return response()->json($admins, 200);
    }

    public function store(AdminRequest $request)
    {
        $admin = new Admin();
        $admin->email = $request->email;
        $admin->password = Hash::make($request->password);
        $admin->phone = $request->phone;
        $admin->save();

        return response()->json($admin, 201);
    }

    public function view($adminId)
    {
        $admin = Admin::where('id', $adminId)->where('deleted_at', null)->first();
    
        if ($admin === null) {
            return response()->json('admin_not_found', 500);
        }

        return response()->json($admin, 200);
    }

    
    public function update(AdminRequest $request, $adminId)
    {
        $admin = Admin::where('id', $adminId)->where('deleted_at', null)->first();

        if ($admin === null) {
            return response()->json('admin_not_found', 500);
        }

        $admin->email = $request->email;
        $admin->password = Hash::make($request->password);
        $admin->phone = $request->phone;
        $admin->update();

        return response()->json($admin, 201);
    }

    public function destory($adminId)
    {
        $admin = Admin::where('id', $adminId)->where('deleted_at', null)->first();

        if ($admin === null) {
            return response()->json('admin_not_found', 500);
        }

        $admin->deleted_at = Carbon::now();
        $admin->save();

        return response()->json($admin, 200);

    }

    public function send_mail(Request $request)
    {
        $details = [
            'title' => 'The Japanese Language Proficiency Test in 2022 (July)',
            'body' => 'Please make sure that all the necessary information.'
        ];

        $user = User::where('status', 'approve')->whereIn('user_id', $request)->get();
        Mail::to($user)->send(new TestMail($details));

        return response()->json("Email is Sent.", 200);
    }

    public function show_mail(Request $request)
    {
        $user = User::select('name', 'email')->whereIn('user_id', $request)->get();
        $mail = [
            'user' => $user,
            'title' => 'The Japanese Language Proficiency Test in 2022 (July)',
            'body' => 'Please make sure that all the necessary information.'
        ];

        return response()->json($mail, 200);
    }
}
