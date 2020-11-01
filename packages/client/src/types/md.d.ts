declare module '*.md' {
	interface MarkdownFile {
		metadata: Record<string, unknown>;
		content: string;
	}

	const markdownFile: MarkdownFile;

	export default markdownFile;
}
