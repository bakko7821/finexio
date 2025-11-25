import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
