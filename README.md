# claude-hooks

Claude Code 플러그인 마켓플레이스. `format-lint-hook` 플러그인을 설치하면, Claude Code가 이 플러그인이 활성화된 세션에서 파일을 `Write`/`Edit`할 때마다 자동으로 포맷팅+린트가 실행된다.

- `.py` → `ruff format` + `ruff check --fix`
- `.js` / `.html` / `.css` → `prettier --write` (npx로 실행, 별도 설치 불필요)

Node.js 스크립트(`scripts/format-on-save.js`)로 동작해서 Mac/Linux/Windows 어디서든 같은 플러그인으로 작동한다.

## 설치

```
/plugin marketplace add Se0jwon/claude-hooks
/plugin install format-lint-hook@claude-hooks
```

## 필요 도구

- [ruff](https://docs.astral.sh/ruff/installation/) — Python 포맷팅/린트 (`.py` 파일에만 필요)
  - Mac: `brew install ruff`
  - Windows: `winget install --id=astral-sh.Ruff -e` 또는 `pip install ruff`
- Node.js (`node`, `npx`) — JS/HTML/CSS 포맷팅(prettier)에 필요. 플러그인 자체도 node로 실행되므로 필수.
  - Mac: `brew install node`
  - Windows: `winget install --id=OpenJS.NodeJS.LTS -e`

둘 다 없으면 해당 확장자 포맷팅만 조용히 스킵되고(에러로 작업이 막히지 않음), 다른 동작에는 영향 없다.

## 확인 / 제거

- Claude Code 안에서 `/hooks`로 적용된 hook 목록 확인 가능.
- 끄려면 `/plugin uninstall format-lint-hook@claude-hooks` 또는 플러그인을 비활성화.
