"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk"); // 让console.log带颜色输出
const yosay = require("yosay");
const mkdirp = require("mkdirp"); // 创建目录

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  // 接受用户输入
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the grand ${chalk.red(
          "generator-javascript-plugin"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  // 创建项目目录
  default() {
    // eslint-disable-next-line no-undef
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  // 写文件
  writing() {
    // 将templates目录的代码拷贝到目标目录
    // templates目录默认路径是generators/app/templates
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
    this._writingPackageJSON();
  }

  // 以下划线_开头的是私有方法
  _writingPackageJSON() {
    // This.fs.copyTpl(from, to, context)
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.name,
        description: this.props.description,
        keywords: this.props.keywords.split(","),
        author: this.props.author,
        email: this.props.email,
        repository: this.props.repository,
        homepage: this.props.homepage,
        license: this.props.license
      }
    );
  }

  // 安装依赖
  install() {
    this.installDependencies();
  }
};
