import { Router } from "express";
import { Transaction } from "../models/Transaction";
import { sequelize } from "../config/db";
import { Category } from "../models/Category";

const router = Router();

sequelize.addModels([Transaction]);

router.post("/add", async(req, res) => {
    try {
        const {ownerId, icon, name, categoryId, count} = req.body;

        if (!ownerId || !categoryId) 
            return res.status(400).json({ message: "Не верно выбрана категория или пользователь не авторизован" });

        if (!name || !count)
            return res.status(400).json({ message: "Введите название и укажите сумму"})

        const transaction = Transaction.create({ownerId, icon, name, categoryId, count})

        return res.json({ message: "Транзакция добавлена", transaction });
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
        
        const transaction = await Transaction.findByPk(id, {
            include: [Category],
        });

        if (!transaction) {
            return res.status(404).json({ message: "Задачи не найдены" });
        }

        res.json(transaction);
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

        const transactions = await Transaction.findAll({
            where: { ownerId },
            include: [Category],
            order: [["createdAt", "DESC"]],
        });


        if (!transactions || transactions.length === 0) {
            return res.status(404).json({
                message: "Транзакции не найдены или отсутствуют"
            });
        }

        const grouped = transactions.reduce((acc: any, t: any) => {
            const monthKey = t.createdAt.toISOString().slice(0, 7);
            if (!acc[monthKey]) acc[monthKey] = [];
            acc[monthKey].push(t);
            return acc;
        }, {});

        res.json(grouped);

    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ error });
    }
});


export default router