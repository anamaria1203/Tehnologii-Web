import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, "out-dir");
const filePath = path.join(dirPath, "hello.txt");

async function main() {
  await fs.mkdir(dirPath, { recursive: true });
  console.log("✅ Director creat:", dirPath);

  await fs.writeFile(filePath, "Salut din Node.js 👋\n", "utf8");
  console.log("✅ Fișier creat:", filePath);

  const files = await fs.readdir(dirPath);
  console.log("📂 Conținut:", files);

  await fs.rm(dirPath, { recursive: true, force: true });
  console.log("🗑️  Director șters:", dirPath);
}

main().catch((err) => {
  console.error("❌ Eroare:", err);
  process.exit(1);
});
