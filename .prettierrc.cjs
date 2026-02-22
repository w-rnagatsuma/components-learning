module.exports = {
  semi: true, // 文末のセミコロン
  singleQuote: true, // 文字列にシングルクォート（'）を使用する
  trailingComma: 'all', // 可能な限り末尾にカンマを追加（配列、オブジェクト、関数の引数など）
  printWidth: 100, // 1行の最大文字数（これを超えると改行される）
  tabWidth: 2, // インデントをスペース2つ分に設定
  bracketSpacing: true, // オブジェクトリテラルの括弧内にスペースを入れる（例：{ foo: bar }）
  arrowParens: 'always', // アロー関数の引数が1つでも常に括弧で囲む（例：(x) => x）
  endOfLine: 'lf', // 改行コードをLF（\n）に統一（Unix/Mac形式）
};
