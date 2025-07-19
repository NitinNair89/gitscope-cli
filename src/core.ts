import { getCommits } from "./git-service";

export async function generateSummary(limit: number) {
	console.log(`🧠 Generating summary of last ${limit} commits...`);
	const commits = await getCommits(limit);
	commits.forEach((commit) => console.log(commit));
}
