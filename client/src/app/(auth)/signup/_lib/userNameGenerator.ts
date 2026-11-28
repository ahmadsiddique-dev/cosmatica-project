export function generateNumericUsername(fullName: string): string {
  const cleanName = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 12) || "user";

  const timePart = Date.now().toString().slice(-4);
  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `${cleanName}${timePart}${randomPart}`;
}