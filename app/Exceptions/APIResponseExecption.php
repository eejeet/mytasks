<?php

namespace App\Exceptions;

use App\Services\ApiResponse;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Redirect;

class APIResponseExecption extends Exception
{


    public function render($request, \Throwable $exception)
    {

        // dd('dfdf');
        //api request
        if ($request->is('api/*')) {
            // if ($exception instanceof ValidationException) {
            //     return ApiResponse::error($exception->validator->errors(), $exception->getMessage(), 422);
            // }
            // any exception return in api reponse formate add addtional data debug in all error
            // return ApiResponse::error($exception->getMessage(), $exception->getMessage(), $exception->getCode());



            // }
        } // else if WEB Then Error Is Different
        else {
            // if request is part of inertia js then return parent render, Because its was not repond as web
//            if ($request->headers->has('x-inertia')) return parent::render($request, $exception);

        }


        // return parent::render($request, $exception);
    }
}
