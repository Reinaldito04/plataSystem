const { FusesPlugin } = require('@electron-forge/plugin-fuses')
const { FuseV1Options, FuseVersion } = require('@electron/fuses')

module.exports = {
  packagerConfig: {
    asar: true, // Empaquetar la aplicación en un archivo .asar
    main: '/home/reinaldo/Documentos/dev/plataSystem/plataSystem/out/main/index.js'
  },
  rebuildConfig: {}, // Configuración para la reconstrucción de módulos nativos
  makers: [
    {
      name: '@electron-forge/maker-squirrel', // Empaquetador para Windows
      config: {} // Configuración específica para el maker (opcional)
    },
    {
      name: '@electron-forge/maker-zip', // Empaquetador para macOS
      platforms: ['darwin'] // Limitado a la plataforma macOS
    },
    {
      name: '@electron-forge/maker-deb', // Empaquetador para distribuciones basadas en Debian
      config: {} // Configuración específica para el maker (opcional)
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {} // Configuración para desempaquetar nativos automáticamente
    },
    // Plugin para gestionar opciones de fusibles antes de firmar la aplicación
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    })
  ]
}
