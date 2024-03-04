import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    return NextResponse.json([
        {
          "id": "abc-123-def-456",
          "title": "Meeting with Client A",
          "date": "2024-03-03T09:12:35Z"
        },
        {
          "id": "ghi-789-jkl-012",
          "title": "Conference Call",
          "date": "2024-03-15T15:28:10Z"
        },
        {
          "id": "mno-345-pqr-678",
          "title": "Team Training",
          "date": "2024-03-03T12:50:22Z"
        },
        {
          "id": "stu-901-vwx-234",
          "title": "Project Presentation",
          "date": "2024-03-19T17:03:44Z"
        },
        {
          "id": "yza-567-bcd-890",
          "title": "Product Launch",
          "date": "2024-03-07T08:25:51Z"
        },
        {
            "id": "xxx-001-xxx-001",
            "title": "Weekly Team Meeting",
            "date": "2024-03-27T10:00:00Z"
        },
        {
            "id": "xxx-002-xxx-002",
            "title": "Project Review",
            "date": "2024-03-28T14:30:00Z"
        },
        {
            "id": "xxx-003-xxx-003",
            "title": "Client Demo",
            "date": "2024-03-29T11:15:00Z"
        },
        {
            "id": "xxx-004-xxx-004",
            "title": "Team Lunch",
            "date": "2024-03-01T12:00:00Z"
        },
        {
            "id": "xxx-005-xxx-005",
            "title": "Monthly Review Meeting",
            "date": "2024-03-02T09:00:00Z"
        }
    ])
}