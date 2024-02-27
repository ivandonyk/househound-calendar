import { NextRequest, NextResponse } from "next/server"
import { cookies, headers } from "next/headers"
import { getAuth } from "firebase/auth";
import { app } from "@/app/_lib/firebase/firebase";

export async function POST(request: NextRequest) {
    
}