const TOKEN_RE =
  /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(import|from|export|default|function|return|const|let|var|if|else|new|async|await)\b|(=>)|(<\/?[A-Za-z][\w.]*|\/>|>)|([A-Za-z_$][\w$-]*)(?=\s*=)|(\d+(?:\.\d+)?)|([{}()[\]=;:,.])/g;

export function highlight(code) {
  const nodes = [];
  let last = 0;
  let key = 0;
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code))) {
    if (m.index > last) nodes.push(code.slice(last, m.index));
    const cls = m[1]
      ? "tok-com"
      : m[2]
        ? "tok-str"
        : m[3]
          ? "tok-kw"
          : m[4]
            ? "tok-punc"
            : m[5]
              ? "tok-tag"
              : m[6]
                ? "tok-attr"
                : m[7]
                  ? "tok-num"
                  : "tok-punc";
    nodes.push(
      <span key={key++} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}
