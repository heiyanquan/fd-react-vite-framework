import { languages } from '@codemirror/language-data'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { less } from '@codemirror/lang-less'
import { sass } from '@codemirror/lang-sass'
import { json } from '@codemirror/lang-json'
import { python } from '@codemirror/lang-python'
import { sql, MySQL, PostgreSQL } from '@codemirror/lang-sql'
import { java } from '@codemirror/lang-java'
import { vue } from '@codemirror/lang-vue'

export const langs = {
  sass: () => sass(),
  javascript,
  jsx: () => javascript({ jsx: true }),
  typescript: () => javascript({ typescript: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  vue: () => vue(),
  json,
  html,
  css,
  python,
  markdown: () => markdown({ base: markdownLanguage, codeLanguages: languages }),
  sql,
  mysql: () => sql({ dialect: MySQL }),
  pgsql: () => sql({ dialect: PostgreSQL }),
  java,
  less: () => less()
}

/** Language list */
export const langNames = Object.keys(langs) as LanguageName[]
export type LanguageName = keyof typeof langs

export function loadLanguage(name: LanguageName) {
  return langs[name] ? langs[name]() : null
}
