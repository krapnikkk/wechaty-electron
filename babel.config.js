module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    'transform-class-properties',
    ['import', {
      libraryName: 'antd',
      libraryDirectory: 'lib',
      style: 'css'
    }]
  ]
}
