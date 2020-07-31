## Electron + TypeScript + React
Boilerplate for a project using Electron, React and Typescript

## Installation

Use a package manager of your choice (npm, yarn, etc.) in order to install all dependencies

```bash
npm install
```

```bash
yarn install
```

## Fixed Failed
启动过程中出现该Failed的解决方法，需要python和Visual Studio Build Tools环境【国内环境有点慢】

[参考文章](https://blog.csdn.net/qq_25932877/article/details/88306557) 

```bash
Error: Failed to load gRPC binary module because it was not installed for the current system
```

```bash
.\node_modules\.bin\electron-rebuild.cmd
```

## Usage
In order to run this project 2 scripts will need to be executed `dev:react` and `dev:electron`, run each one in a different terminal and always run `dev:react` before `dev:electron`, or `dev` to run them in order automatically

```bash
npm run dev:react
```
```bash
npm run dev:electron
```

or

```bash
npm run dev
```

## Packaging
To generate a project package run `package`

```bash
npm run package || npm run pack
```



## Contributing

Pull requests are always welcome 😃.

## License

[MIT](https://choosealicense.com/licenses/mit/)
