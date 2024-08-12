module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
    'prettier'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        printWidth: 100,
        trailingComma: 'none',
        endOfLine: 'auto' // Esto evita el problema con los finales de línea CRLF
      }
    ]
    // Otras reglas personalizadas pueden ir aquí
  }
}
