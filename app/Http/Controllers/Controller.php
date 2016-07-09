<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    function remittance(Request $request) {
        try {
            $source = $request->input('source');
            $destination = $request->input('destination');
            $amount = $request->input('amount');

            $db_source = \DB::table('users')->find($source['id']);
            $db_destination = \DB::table('users')->find($destination['id']);
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }

        if (!$db_source) {
            return [
                'error' => 'Неверные данные пользователя'
            ];
        }

        if ($db_source->balance < $amount) {
            return [
                'error' => 'Запрошенная сумма превышет текущий баланс!'
            ];
        }

        try {
            \DB::table('users')
                ->where('id', $db_source->id)
                ->update(['balance' => $db_source->balance - $amount]);

            \DB::table('users')
                ->where('id', $db_destination->id)
                ->update(['balance' => $db_destination->balance + $amount]);

            return [
                'error' => false
            ];

        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }
}
