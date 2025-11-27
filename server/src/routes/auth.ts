import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { sequelize } from "../config/db";

const router = Router();

sequelize.addModels([User]);

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Введите username, email и пароль" });

    const candidate = await User.findOne({ where: { username } });

    if (candidate) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const hash = await bcrypt.hash(password, 7);

    const user = await User.create({ username, email, password: hash });

    return res.json({ message: "Регистрация успешна", user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user)
      return res.status(400).json({ message: "Неверный username или пароль" });

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid)
      return res.status(400).json({ message: "Неверный username или пароль" });

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
    );

    return res.json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
