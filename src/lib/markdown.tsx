import type { ReactNode } from "react";

/**
 * A deliberately small Markdown subset, rendered without a parser dependency.
 *
 * Supported: `##`/`###` headings, `- ` bullets, fenced code blocks, pipe
 * tables, `**bold**` and `` `code` ``. Everything else renders as a paragraph.
 *
 * Content is authored as indented template literals in `src/lib/data.ts`, so
 * prose lines are trimmed and code blocks have their common indent stripped.
 */

type Block =
    | { kind: "heading"; level: 2 | 3; text: string }
    | { kind: "paragraph"; text: string }
    | { kind: "list"; items: string[] }
    | { kind: "code"; language: string; code: string }
    | { kind: "table"; head: string[] | null; rows: string[][] };

const isTableSeparator = (line: string) => /^\|[\s:|-]+\|?$/.test(line);

const splitRow = (line: string) =>
    line
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim());

/** Removes the shared leading indentation of a template-literal code block. */
function stripCommonIndent(lines: string[]): string[] {
    const indents = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0);

    if (indents.length === 0) return lines;

    const minIndent = Math.min(...indents);
    return minIndent > 0 ? lines.map((line) => line.slice(minIndent)) : lines;
}

export function parseBlocks(content: string): Block[] {
    const lines = content.split("\n");
    const blocks: Block[] = [];

    let listItems: string[] = [];
    let tableRows: string[][] = [];
    let tableHead: string[] | null = null;

    const flushList = () => {
        if (listItems.length > 0) {
            blocks.push({ kind: "list", items: listItems });
            listItems = [];
        }
    };

    const flushTable = () => {
        if (tableHead || tableRows.length > 0) {
            blocks.push({ kind: "table", head: tableHead, rows: tableRows });
            tableHead = null;
            tableRows = [];
        }
    };

    const flushAll = () => {
        flushList();
        flushTable();
    };

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index].trim();

        // Fenced code block — consume through the closing fence.
        if (line.startsWith("```")) {
            flushAll();
            const language = line.slice(3).trim();
            const body: string[] = [];

            index += 1;
            while (index < lines.length && !lines[index].trim().startsWith("```")) {
                body.push(lines[index]);
                index += 1;
            }

            blocks.push({
                kind: "code",
                language,
                code: stripCommonIndent(body).join("\n").replace(/^\n+|\n+$/g, ""),
            });
            continue;
        }

        if (!line) {
            flushAll();
            continue;
        }

        if (line.startsWith("### ")) {
            flushAll();
            blocks.push({ kind: "heading", level: 3, text: line.slice(4) });
            continue;
        }

        if (line.startsWith("## ")) {
            flushAll();
            blocks.push({ kind: "heading", level: 2, text: line.slice(3) });
            continue;
        }

        if (line.startsWith("- ")) {
            flushTable();
            listItems.push(line.slice(2));
            continue;
        }

        if (line.startsWith("|")) {
            flushList();

            // A separator promotes the row already collected to the header.
            if (isTableSeparator(line)) {
                if (tableHead === null && tableRows.length === 1) {
                    tableHead = tableRows[0];
                    tableRows = [];
                }
                continue;
            }

            tableRows.push(splitRow(line));
            continue;
        }

        flushAll();
        blocks.push({ kind: "paragraph", text: line });
    }

    flushAll();
    return blocks;
}

/** Applies `**bold**` and `` `code` `` to a single line of text. */
export function formatInline(text: string): ReactNode[] {
    return text.split(/\*\*(.*?)\*\*/g).flatMap((segment, boldIndex) => {
        if (boldIndex % 2 === 1) {
            return [<strong key={`b-${boldIndex}`}>{segment}</strong>];
        }

        return segment
            .split(/`([^`]+)`/g)
            .map((part, codeIndex) =>
                codeIndex % 2 === 1 ? (
                    <code key={`c-${boldIndex}-${codeIndex}`}>{part}</code>
                ) : (
                    part
                ),
            );
    });
}

export function renderBlocks(content: string): ReactNode[] {
    return parseBlocks(content).map((block, index) => {
        switch (block.kind) {
            case "heading":
                return block.level === 2 ? (
                    <h2 key={index}>{block.text}</h2>
                ) : (
                    <h3 key={index}>{block.text}</h3>
                );

            case "list":
                return (
                    <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
                        {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{formatInline(item)}</li>
                        ))}
                    </ul>
                );

            case "code":
                return (
                    <div key={index} className="my-6">
                        {block.language && (
                            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
                                {block.language}
                            </p>
                        )}
                        <pre>
                            <code>{block.code}</code>
                        </pre>
                    </div>
                );

            case "table":
                return (
                    <div key={index} className="my-6 overflow-x-auto">
                        <table>
                            {block.head && (
                                <thead>
                                    <tr>
                                        {block.head.map((cell, cellIndex) => (
                                            <th key={cellIndex} scope="col">
                                                {formatInline(cell)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {block.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{formatInline(cell)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "paragraph":
            default:
                return <p key={index}>{formatInline(block.text)}</p>;
        }
    });
}
