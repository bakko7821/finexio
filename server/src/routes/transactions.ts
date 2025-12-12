import { Router } from "express";
import { Transaction } from "../models/Transaction";
import { sequelize } from "../config/db";
import { Category } from "../models/Category";
import authMiddleware from "../middleware/authMiddleware";
import { Op } from "sequelize";

const router = Router();

sequelize.addModels([Transaction]);

router.post("/add", async(req, res) => {
    try {
        const {ownerId, name, categoryId, count} = req.body;

        if (!ownerId || !categoryId) 
            return res.status(400).json({ message: "Не верно выбрана категория или пользователь не авторизован" });

        if (!name || !count)
            return res.status(400).json({ message: "Введите название и укажите сумму"})

        const transaction = Transaction.create({ownerId, name, categoryId, count})

        return res.json({ message: "Транзакция добавлена", transaction });
    } catch (error: unknown) {
        console.error(error)
        res.status(500).json({ error })
    }
})

router.delete("/delete/:id", authMiddleware, async (req, res) => {
    const userId = (req as any).user.id;

    try {
        const transactionId = Number(req.params.id);

        const transaction = await Transaction.findOne({
            where: { id: transactionId }
        });

        if (!transaction) {
            return res.status(404).json({ message: "Транзакция не найдена" });
        }

        if (transaction.ownerId !== userId) {
            return res.status(403).json({ message: "Нет прав на удаление этой транзакции" });
        }

        await transaction.destroy();

        return res.json({ message: "Транзакция успешно удалена" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.get("/now-month/:ownerId", authMiddleware, async (req, res) => {
    try {
        const ownerId = Number(req.params.ownerId);
        if (!ownerId) {
            return res.status(400).json({ message: "Не верно передан параметр ownerId" });
        }

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        const transactions = await Transaction.findAll({
            where: {
                ownerId,
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth],
                },
            },
            include: [Category], // нужно для name и icon
        });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: "Нет транзакций за этот месяц" });
        }

        // Агрегация только по расходам (отрицательные числа)
        const aggregated: { [key: number]: { categoryId: number, color: string, name: string, icon: string, value: number } } = {};

        transactions.forEach(t => {
            if (t.count >= 0) return; // пропускаем доходы

            const cat = t.category;
            if (!aggregated[cat.id]) {
                aggregated[cat.id] = { categoryId: cat.id, color: cat.color, name: cat.name, icon: cat.icon, value: 0 };
            }
            aggregated[cat.id].value += t.count; // здесь value будет отрицательным
        });

        return res.json(Object.values(aggregated));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.get("/last-and-now/:ownerId", authMiddleware, async (req, res) => {
    try {
        const ownerId = Number(req.params.ownerId);
        if (!ownerId) {
            return res.status(400).json({ message: "Не верно передан параметр ownerId" });
        }

        const now = new Date();

        // --- Текущий месяц ---
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
        const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        // --- Прошлый месяц ---
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

        // --- Функция для агрегации расходов ---
        const aggregateExpenses = async (start: Date, end: Date) => {
            const transactions = await Transaction.findAll({
                where: {
                    ownerId,
                    createdAt: { [Op.between]: [start, end] }
                },
                include: [Category]
            });

            const aggregated: { [key: number]: { categoryId: number, name: string, icon: string, value: number } } = {};
            transactions.forEach(t => {
                if (t.count >= 0) return; // учитываем только расходы
                const cat = t.category;
                if (!aggregated[cat.id]) {
                    aggregated[cat.id] = { categoryId: cat.id, name: cat.name, icon: cat.icon, value: 0 };
                }
                aggregated[cat.id].value += t.count;
            });

            return aggregated;
        };

        const thisMonth = await aggregateExpenses(startOfThisMonth, endOfThisMonth);
        const lastMonth = await aggregateExpenses(startOfLastMonth, endOfLastMonth);

        // Возвращаем оба массива
        return res.json({
            thisMonth: Object.values(thisMonth),
            lastMonth: Object.values(lastMonth)
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.get("/all-value/:ownerId", authMiddleware, async (req, res) => {
    try {
        const ownerId = Number(req.params.ownerId);

        if (!ownerId) {
            return res.status(400).json({ message: "Неверно передан параметр ownerId" });
        }

        // Названия месяцев на русском
        const monthNames = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];

        const transactions = await Transaction.findAll({
            where: { ownerId },
        });

        // Создаём объект с нулями для всех месяцев
        const aggregated: { [key: number]: number } = {};
        monthNames.forEach((_, index) => {
            aggregated[index] = 0;
        });

        // Суммируем расходы
        transactions.forEach(t => {
            const amount = Number(t.count);
            if (isNaN(amount) || amount >= 0) return;

            const monthIndex = new Date(t.createdAt).getMonth();
            aggregated[monthIndex] += Math.abs(amount);
        });

        // Переводим в массив
        const result = monthNames.map((month, index) => ({
            month,
            value: aggregated[index] // будет 0, если нет транзакций
        }));

        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

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


router.get("/:month/:ownerId", authMiddleware, async (req, res) => {
    try {
        const month = Number(req.params.month);
        const ownerId = Number(req.params.ownerId);

        if (!ownerId || isNaN(month)) {
            return res.status(400).json({ message: "Неверные параметры" });
        }

        if (month < 1 || month > 12) {
            return res.status(400).json({ message: "Месяц должен быть от 1 до 12" });
        }

        const year = new Date().getFullYear();

        const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);

        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

        const transactions = await Transaction.findAll({
            where: {
                ownerId,
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth],
                },
            },
            include: [Category],
        });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: "Нет транзакций за этот месяц" });
        }

        const aggregated: {
            [key: number]: {
                categoryId: number,
                color: string,
                name: string,
                icon: string,
                value: number
            }
        } = {};

        transactions.forEach(t => {
            if (t.count >= 0) return;

            const cat = t.category;
            if (!aggregated[cat.id]) {
                aggregated[cat.id] = {
                    categoryId: cat.id,
                    color: cat.color,
                    name: cat.name,
                    icon: cat.icon,
                    value: 0
                };
            }
            aggregated[cat.id].value += t.count;
        });

        return res.json(Object.values(aggregated));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
});

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

export default router