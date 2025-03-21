import * as vscode from "vscode";

export class GutterIconProvider {
    private static instance: GutterIconProvider | null = null;
    private lineMarkerDecoration: vscode.TextEditorDecorationType;
    private decorationRanges: Map<string, vscode.Range[]> = new Map(); // URI 별로 범위 저장

    constructor(context: any) {
        // 데코레이션 타입 초기화
        this.lineMarkerDecoration =
            vscode.window.createTextEditorDecorationType({
                gutterIconPath: context.asAbsolutePath(
                    "images/group_icon_blue.svg"
                ), // 실제 경로로 수정
                gutterIconSize: "contain",
            });

        // 에디터 변경 이벤트 구독하여 데코레이션 유지
        vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor) {
                this.updateDecorations(editor);
            }
        });

        // 문서 변경 이벤트 구독하여 데코레이션 유지
        vscode.workspace.onDidChangeTextDocument((event) => {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document === event.document) {
                this.updateDecorations(editor);
            }
        });
    }

    public static getInstance(
        context: vscode.ExtensionContext
    ): GutterIconProvider {
        if (!GutterIconProvider.instance) {
            GutterIconProvider.instance = new GutterIconProvider(context);
        }

        return GutterIconProvider.instance;
    }

    public getLineMarkerDecoration() {
        return this.lineMarkerDecoration;
    }

    get(uri: any) {
        return this.decorationRanges.get(uri);
    }

    set(uri: any, ranges: any) {
        this.decorationRanges.set(uri, ranges);
    }

    // 에디터 변경 시 데코레이션 업데이트
    updateDecorations(editor: vscode.TextEditor) {
        const uri = editor.document.uri.toString();
        const ranges = this.decorationRanges.get(uri) || [];

        if (ranges.length > 0) {
            editor.setDecorations(this.lineMarkerDecoration, ranges);
        }
    }
}
