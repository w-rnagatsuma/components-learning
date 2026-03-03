// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt(eslintConfigPrettier, {
  // Nuxtのページコンポーネントは単語数が1つになることが多いので、ルールをオフにする
  files: ['pages/**/*.vue', 'src/pages/**/*.vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
});
