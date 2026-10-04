// Назва бренду — в одному місці. Змінити тут, коли Вова обере остаточну.
export const brand = {
  name: "Збір",
  tagline: "Маркетплейс лікарських рослин",
  description:
    "Продавайте зібрану й висушену лікарську сировину, знаходьте закупівельників і отримуйте кращу ціну на аукціоні.",
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${basePath}${p}`;
