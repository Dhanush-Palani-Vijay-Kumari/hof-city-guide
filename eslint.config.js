import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'android', 'ios', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    files: ['scripts/**', '*.config.*'],
    languageOptions: { globals: { console: 'readonly', process: 'readonly' } },
  },
  prettier,
  { rules: { 'vue/multi-word-component-names': 'off' } },
)
