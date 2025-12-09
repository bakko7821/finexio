export type IconConfig = {
    icon: string;      // Сам эмодзи (например, "🚗")
    color: string;     // Акцентный цвет (для контейнера)
};

const ICON_MAP: Record<string, IconConfig> = {
    // 💰 ДОХОД И ФИНАНСЫ
    "зарплата": { icon: "💰", color: "#4CAF50" }, // Зеленый
    "инвестиции": { icon: "📈", color: "#00BCD4" }, // Бирюзовый
    "кэшбэк": { icon: "💳", color: "#4CAF50" },

    // 🏡 ЖИЛЬЕ И КОММУНАЛЬНЫЕ УСЛУГИ
    "аренда": { icon: "🏠", color: "#009688" }, // Темно-зеленый
    "жкх": { icon: "💡", color: "#00BCD4" }, // Лампочка/Электричество

    // 🛒 ЕДА И ПРОДУКТЫ
    "продукты": { icon: "🛒", color: "#FF9800" }, // Корзина
    "еда": { icon: "🍕", color: "#FF7043" }, // Пицца/Еда вне дома

    // 🚗 ТРАНСПОРТ
    "машина": { icon: "🚗", color: "#1E88E5" }, // Синий
    "бензин": { icon: "⛽", color: "#1E88E5" }, // Колонка
    "метро": { icon: "🚇", color: "#1E88E5" }, // Метро
    
    // ... и т.д.
};

export function getIconConfig(categoryText: string): IconConfig {
    // ✅ ИСПРАВЛЕНО: Используем 'icon' и эмодзи по умолчанию
    const DEFAULT_CONFIG: IconConfig = { icon: "❓", color: "#78909C" }; 
    
    if (!categoryText) return DEFAULT_CONFIG;

    // 1. Нормализация...
    const normalizedText = categoryText.toLowerCase().trim();

    // 2. Поиск...
    for (const keyword in ICON_MAP) {
        if (normalizedText.includes(keyword)) {
            return ICON_MAP[keyword];
        }
    }

    // 3. Если ничего не найдено
    return DEFAULT_CONFIG;
}