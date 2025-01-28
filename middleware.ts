import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { v4 as uuidv4 } from "uuid"

const colors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
  "Brown",
  "Gray",
  "Black",
  "White",
  "Cyan",
  "Magenta",
  "Lime",
  "Teal",
  "Indigo",
  "Violet",
  "Maroon",
  "Navy",
  "Olive",
]

const animals = [
  "Panda",
  "Tiger",
  "Elephant",
  "Giraffe",
  "Lion",
  "Zebra",
  "Kangaroo",
  "Koala",
  "Penguin",
  "Dolphin",
  "Wolf",
  "Fox",
  "Bear",
  "Deer",
  "Owl",
  "Eagle",
  "Hawk",
  "Rabbit",
  "Squirrel",
  "Raccoon",
]

function generateUserName(): string {
  const color = colors[Math.floor(Math.random() * colors.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const number = Math.floor(Math.random() * 101) // 0 to 100
  return `${color}${animal}${number}`
}

export function middleware(request: NextRequest) {
  if (!request.cookies.has("user-info")) {
    const userId = uuidv4()
    const userName = generateUserName()
    const userInfo = JSON.stringify({ userId, userName })

    const response = NextResponse.next()
    response.cookies.set({
      name: "user-info",
      value: userInfo,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // No 'expires' or 'maxAge' set, so it becomes a session cookie
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}

