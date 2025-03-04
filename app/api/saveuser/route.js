import dbConnect from "../db/mongoDBconnection";
import users from "../models/users";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, message } = await req.json();

    const saveUser = await users.create({ name, email, message });

    return Response.json({ data: saveUser }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const allUsers = await users.find();

    return Response.json({ data: allUsers }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
