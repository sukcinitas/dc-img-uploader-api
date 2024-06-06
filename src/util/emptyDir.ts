import { promises as fs } from "fs";
import path from "path";

const emptyDir = async (directory: string, currentFile: string) => {
  const files = await fs.readdir(directory);
  if (files.length < 5) {
    return;
  }
  for (const element of files) {
    if (element === currentFile || element === ".gitignore") {
      continue;
    } else {
      await fs.unlink(path.join(directory, element));
    }
  }
};

export default emptyDir;
