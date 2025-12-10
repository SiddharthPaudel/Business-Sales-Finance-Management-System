// lib/saveFile.js
import { writeFile } from "fs/promises";
import path from "path";

export async function saveFile(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = Date.now() + "-" + file.name;
  const uploadDir = path.join(process.cwd(), "public/uploads");

  await writeFile(path.join(uploadDir, filename), buffer);

  return filename; // stored in DB
}
