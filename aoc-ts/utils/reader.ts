async function readInputFileByNewLines(path: string): Promise<string[]> {
    const file = Bun.file(path);
    const lines = await file.text();
    return lines.split(/\r?\n/);
}

export { readInputFileByNewLines };
