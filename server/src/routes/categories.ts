import { Router } from "express";
import { sequelize } from "../config/db";
import { Category } from "../models/Category";

const router = Router();

sequelize.addModels([Category]);

router.post("/add",  async(req, res) => {
    try {
        const {ownerId, icon, name} = req.body;

        if (!ownerId) 
            return res.status(400).json({ message: "Пользователь не авторизован" });

        if (!icon || !name)
            return res.status(400).json({ message: "Введите название и иконку"})

        const category = await Category.create({ownerId, icon, name})

        return res.json({ 
            message: 'Категория создана',
            category: category
        });
    } catch (error: unknown) {
        console.error(error)
        res.status(500).json({ error })
    }
})

router.get("/:id", async(req, res) => {
    try {
        const id = Number(req.params.id)

        if (!id) 
            return res.status(400).json({ message: "Не верно передан параметр id"})
        
        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(404).json({ message: "Задачи не найдены" });
        }

        res.json(category);
    } catch (error: unknown) {
        console.error(error)
        res.status(500).json({ error })
    }
})

router.get("/all/:ownerId", async (req, res) => {
    try {
        const ownerId = Number(req.params.ownerId);

        if (!ownerId) {
            return res.status(400).json({
                message: "Не верно передан параметр ownerId"
            });
        }

        const categories = await Category.findAll({
            where: { ownerId },
            order: [["createdAt", "DESC"]],
        });

        res.json(categories);
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ error });
    }
});


export default router