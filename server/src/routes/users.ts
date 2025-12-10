import { Router } from "express";
import { sequelize } from "../config/db";
import { Category } from "../models/Category";
import { User } from "../models/User";

const router = Router();

sequelize.addModels([Category]);

router.get('/:id', async(req, res) => {
    try {
        const id = Number(req.params.id)

        if (!id) 
            return res.status(400).json({ message: "Не верно передан параметр id"})
        
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ message: "Задачи не найдены" });
        }

        res.json(user);
    } catch (error: unknown) {
        console.error(error)
        res.status(500).json({ error })
    }
})


export default router