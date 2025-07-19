import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function getCommits(limit: number): Promise<string[]> {
	const cmd = `git log -n ${limit} --pretty=format:"%h %s"`;

	try {
		const { stdout } = await execAsync(cmd);
		return stdout
			.trim()
			.split("\n")
			.map((line) => `- ${line}`);
	} catch (error) {
		console.error("Failed to fetch commits:", error);
		return [];
	}
}
