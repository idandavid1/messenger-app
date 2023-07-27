import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
    try {
        const { email, name, password } = await request.json()
    
        if(!email || !password || !name) return new NextResponse('Missing info,', { status: 400 })
    
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const user = await prisma.user.create({
            data: { email, name, hashedPassword }
        })
    
        return NextResponse.json(user)
    } catch(error: any) {
        console.log('REGISTRATION_ERROR: ' , error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}