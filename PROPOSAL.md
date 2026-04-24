# Rookiz 프로토타입 iframe 정렬 방안

## 1. 현재 상태 vs 목표 상태

### 현재 (5:23:58 스크린샷)
- MacBook 씬 안의 iframe이 **아래쪽으로 밀려** 있음
- 상단 ROOKIZ 로고가 반쯤 잘림
- 캥거루 + 환영 메시지는 보이지만 전체적으로 스크린 영역 밖으로 삐져나온 상태

### 목표 (5:22:37 스크린샷)
- iframe 콘텐츠가 MacBook 스크린 영역에 **정확히 들어맞음**
- ROOKIZ 로고 상단 완전히 보임
- 캥거루·환영 메시지 스크린 중앙 정렬

---

## 2. 원인

- iframe은 `transform: scale(1.3)`로 확대되어 있음
- `clip-path: inset(149px 124px 215px 123px round 4px)`로 마스킹 중
- 내부 Figma canvas의 시작 뷰포트가 MacBook 스크린 바운더리와 어긋나 있음
- **cross-origin 제약**으로 iframe 내부 canvas의 `top`/`left`를 직접 제어 불가

---

## 3. 방안 비교

### 방안 A. 현재 구조 유지 + `translateY()` 추가

```css
.proj-image-embed {
  transform: scale(1.3) translateY(-40px); /* 튜닝값 */
  clip-path: inset(XXpx XXpx XXpx XXpx round 4px); /* 재조정 필요 */
}
```

**장점**
- 구조 변경 없이 CSS만 수정
- 작업량 최소

**단점**
- `scale` + `translate` + `clip-path`가 서로 연동되어 튜닝값 계산 복잡
- iframe이 움직이면 clip-path 좌표도 재산출 필요
- 반복 튜닝 필요

---

### 방안 B. Double wrapper 구조로 전환

```jsx
<div className="device-mask">           {/* 580×580, overflow: hidden */}
  <div className="iframe-shift">        {/* 큰 박스, position: relative */}
    <iframe className="proj-iframe" />  {/* 실제 크기 */}
  </div>
</div>
```

```css
.device-mask {
  width: 580px;
  height: 580px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
}

.iframe-shift {
  position: absolute;
  top: -200px;    /* 픽셀 단위로 밀기 */
  left: -150px;
  width: 1200px;  /* iframe을 충분히 크게 */
  height: 1200px;
}

.proj-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
```

**장점**
- `top`/`left`/`width`/`height` 네 값만 튜닝 (좌표 직관적)
- `scale` 보정 불필요 → 픽셀 그대로 다룸
- `transform: translate()` 사용 시 hover/transition 자연스럽게 연결
- 프로토타입별 좌표 조정 쉬움

**단점**
- JSX 구조 + CSS 동시 수정 필요
- 기존 `embedMask`, `scale()` 관련 CSS 정리 필요

---

## 4. 권장: 방안 B

**이유**
1. 좌표 직관적 (top/left/width/height만)
2. scale 계산 불필요
3. Rookiz·Spotify 각각 튜닝할 때 유지보수 쉬움
4. 현재 `embedMask`+`scale(1.3)` 조합은 좌표 산출이 비직관적이라 이미 한 번 튜닝 지옥을 겪음

---

## 5. 진행 체크리스트 (방안 B 선택 시)

- [ ] `Project.jsx`의 iframe 렌더 분기를 double wrapper 구조로 교체
- [ ] `Project.css`에서 `.proj-image-embed`의 `scale`, `clip-path`, `--embed-mask` 제거
- [ ] `.device-mask`, `.iframe-shift`, `.proj-iframe` 3개 클래스 추가
- [ ] 데이터 필드 `embedMask` 제거, 대신 `embedOffset: { top, left, width, height }` 추가
- [ ] Rookiz·Spotify 각각 `embedOffset` 값 튜닝
- [ ] hover 효과(lift + shadow) 재연결
