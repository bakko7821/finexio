import { Router } from "express";
import { Transaction } from "../models/Transaction";
import { sequelize } from "../config/db";

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
        const id = Number(req.params)

        if (!id) 
            return res.status(400).json({ message: "Не верно передан параметр id"})
        
        const transaction = Transaction.findByPk(id)

        if (!transaction) {
            return res.status(404).json({ message: "Задачи не найдены" });
        }

        res.json(transaction);
    } catch (error: unknown) {
        console.error(error)
        res.status(500).json({ error })
    }
})

router.get("/all/:ownerId", async(req, res) => {
    try {
        const ownerId = Number(req.params)

        if (!ownerId)
            return res.status(400).json({ message: "Не верно передан параметр ownerId"})

        const transactions = await Transaction.findAll({
            where: { ownerId: ownerId }
        });

        if (!transactions) {
            return res.status(404).json({ message: "Транзакции не найдены или отсутствуют" });
        }

        res.json(transactions);

    } catch (error: unknown) {
        console.error(error)
        res.status(500).json({ error })
    }
}) 

export default router