#!/usr/bin/env node
// PostToolUse(Write|Edit) hook: Python은 ruff, JS/HTML/CSS는 prettier로 자동 포맷팅+린트.
// node만 있으면 Mac/Linux/Windows 어디서든 같은 스크립트로 동작한다 (셸 문법 분기 불필요).
const { execFileSync } = require("child_process");

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(raw || "{}");
    const file = data?.tool_response?.filePath || data?.tool_input?.file_path;
    if (!file) return;

    if (file.endsWith(".py")) {
      run("ruff", ["format", file]);
      run("ruff", ["check", "--fix", file]);
    } else if (/\.(js|html|css)$/.test(file)) {
      run("npx", ["--yes", "prettier", "--write", file]);
    }
  } catch (_err) {
    // 어떤 에러가 나도 Claude Code의 작업을 막지 않는다.
  }
});

function run(cmd, args) {
  try {
    execFileSync(cmd, args, {
      stdio: "ignore",
      shell: process.platform === "win32",
    });
  } catch (_err) {
    // 도구가 없거나 포맷/린트 실패 — 조용히 무시.
  }
}
