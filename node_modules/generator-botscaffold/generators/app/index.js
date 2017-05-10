var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  prompting: function () {
    var prompts = [
      {
          type    : String,
          name    : 'botName',
          message : 'Bot name',
          default : this.appname //default to current folder name
      }, {
          type    : String,
          name    : 'botDescription',
          message : 'A one-line description of your Bot'
      }, {
          type    : String,
          name    : 'author',
          message : 'What\s your name?',
          store   : true
      }, {
          type    : String,
          name    : 'authorEmail',
          message : 'Your email address?',
          store   : true
      }, {
          type    : String,
          name    : 'botAppId',
          message : 'Enter your bot ID here, if you have one',
      }, {
          type    : String,
          name    : 'botAppPwd',
          message : 'Enter your bot password here, if you have one',
      }, {
          type    : String,
          name    : 'luisEndpoint',
          message : 'Enter your LUIS endpoint, if you have one',
      },  {
          type    : String,
          name    : 'luisEmbedCode',
          message : 'Enter your LUIS embed code, if you have one',
      }, {
          type    : String,
          name    : 'rootPath',
          message : 'Path where I should put files?',
          default : this.contextRoot // current folder name
      }
    ];
    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(this.props['rootPath'] + '/index.html'),
      { 
        botname: this.props.botname,
        luisEmbedCode: this.props.luisEmbedCode
      }
    )
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(this.props['rootPath'] + '/app.js')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath(this.props['rootPath'] + '/.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('_vscode/launch.json'),
      this.destinationPath(this.props['rootPath'] + '/.vscode/launch.json'),
      {
        botAppId: this.props.botAppId,
        botAppPwd: this.props.botAppPwd,
        luisEndpoint: this.props.luisEndpoint
      }
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(this.props['rootPath'] + '/package.json'),
      {
          botname: this.props.botname,
          botdescription: this.props.botDescription, 
          authorname: this.props.author,
          authoremail: this.props.authoremail
    }
    );
  },
  install: function () {
    this.npmInstall();
  }
});