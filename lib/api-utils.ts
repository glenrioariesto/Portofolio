import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
};

export function sendError(message: string, code = "INTERNAL_SERVER_ERROR", status = 500, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, details },
    },
    { status }
  );
}

export function sendSuccess(data: any, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function handleApiError(error: any) {
  console.error("[API_ERROR]:", error);

  if (error instanceof ZodError) {
    const mainMessage = error.issues[0]?.message || "Data yang Anda masukkan tidak valid";
    return sendError(
      mainMessage,
      "VALIDATION_ERROR",
      400,
      error.issues.map((e: any) => ({ path: e.path, message: e.message }))
    );
  }

  // Handle Specific Database Errors if needed
  if (error.code === "23505") { // Unique violation
    return sendError("Data ini sudah terdaftar", "CONFLICT", 409);
  }

  return sendError(
    error.message || "Terjadi kesalahan pada server",
    error.code || "UNKNOWN_ERROR",
    error.status || 500
  );
}
