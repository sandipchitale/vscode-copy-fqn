'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable;
    disposable = vscode.commands.registerTextEditorCommand('vscode-copy-fqn.copy-fqn', copyFQN);
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

async function copyFQN(editor: vscode.TextEditor) {
    const hovers: vscode.Hover[] | undefined = await getHoversAtCurrentPositionInEditor(editor);
    let FQNCopied = false;
    if (hovers && hovers.length > 0) {
        const parts = (hovers)
            .flatMap(hover => hover.contents)
            .map(content => getMarkdown(content))
            .filter(content => content.length > 0);

        if (parts && parts.length > 0) {
            parts.forEach((part: string) => {
                if ((part.startsWith('\n```') || part.startsWith('```')) && part.endsWith('\n```\n')) {
                    part = part.replace(/^\n```.+\n/, '').replace(/^```.+\n/, '').replace(/\n```\n$/, '');
                    if (part) {
                        vscode.env.clipboard.writeText(enhanceFQN(editor, part));
                        FQNCopied = true;
                        return;
                    }
                }
            });
        }
    }
    if (!FQNCopied) {
        vscode.window.showWarningMessage('Fully Qualified Name not available at cursor!');
    }
}

function getHoversAtCurrentPositionInEditor(editor: vscode.TextEditor) {
    return vscode.commands.executeCommand<vscode.Hover[]>(
        'vscode.executeHoverProvider',
        editor.document.uri,
        editor.selection.active);
}

function getMarkdown(content: vscode.MarkedString): string {
    if (typeof content === 'string') {
        return content;
    } else if (content instanceof vscode.MarkdownString) {
        return content.value;
    } else {
        const markdown = new vscode.MarkdownString();
        markdown.appendCodeblock(content.value, content.language);
        return markdown.value;
    }
}

function enhanceFQN(editor: vscode.TextEditor, part: string): string {
    if (editor.document.languageId === 'java') {
        if (part.indexOf(' ') === -1) {
            // Typename
            return part;
        }

        if (part.indexOf('(') !== -1) {
            // Method
            const matches = /^.*\s+([\S]+\(.+\)).*$/.exec(part);
            if (matches && matches.length > 1) {
                return matches[1];
            }
        }

        const dashIndex = part.indexOf(' -');
        if (dashIndex !== -1) {
            part = part.substring(0, dashIndex);
            return part;
        }

        // Bummer - does not work for fields
    }
    return part;
}