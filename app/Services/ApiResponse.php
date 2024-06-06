<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    /**
     * Create a JSON response.
     *
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @param bool $status
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    protected static function createResponse($data, $message, $code, $status, array $headers = []): JsonResponse
    {
        $response = [
            'status' => $status,
            'code' => $code,
            'message' => $message,
            'data' => $data,

        ];

        return response()->json($response, $code, $headers);
    }

    /**
     * Return a success response.
     *
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public static function success($data = null, $message = 'Operation successful', $code = 200, array $headers = []): JsonResponse
    {
        return self::createResponse($data, $message, $code, true, $headers);
    }

    /**
     * Return an error response.
     *
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public static function error($data = null, $message = 'Operation failed', $code = 400, array $headers = []): JsonResponse
    {
        return self::createResponse($data, $message, $code, false, $headers);
    }

    /**
     * Return a validation error response.
     *
     * @param mixed $errors
     * @param string|null $message
     * @param int $code
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public static function validationError($errors, $message = 'Validation failed', $code = 422, array $headers = []): JsonResponse
    {
        return self::createResponse($errors, $message, $code, false, $headers);
    }

    /**
     * Return a custom response.
     *
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @param bool $status
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public static function custom($data = null, $message = null, $code = 200, $status = true, array $headers = []): JsonResponse
    {
        return self::createResponse($data, $message, $code, $status, $headers);
    }
}
