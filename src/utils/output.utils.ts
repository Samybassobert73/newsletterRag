import fs from "fs/promises"; // Utilisation des Promises pour un meilleur support async/await
import path from "path";

export const writeToFile = async (content: string): Promise<void> => {
  const outputFilePath = path.resolve(
    __dirname,
    "..",
    "output",
    "newsletter.txt"
  );
  try {
    await fs.writeFile(outputFilePath, content, "utf8");
    console.log(`Newsletter written to ${outputFilePath}`);
  } catch (error: any) {
    console.error(`Failed to write to file: ${error.message}`);
  }
};
