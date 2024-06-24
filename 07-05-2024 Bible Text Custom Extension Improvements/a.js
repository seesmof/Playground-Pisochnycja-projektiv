const vscode = require("vscode");
const fetch = require("node-fetch");

let interval = false;
let lastMessage = {};

function activate(context) {
  console.log('Congratulations, your extension "bible-text" is now active!');
  if (
    vscode.workspace.getConfiguration("bibletext").get("show-on-startup", true)
  ) {
    message();
  }
  interval = setInterval(async () => {
    if (vscode.window.state.focused) {
      message();
    }
  }, parseInt(vscode.workspace.getConfiguration("bibletext").get("duration") || "1") * 60 * 1000);

  let disposable = vscode.commands.registerCommand(
    "bible-text.previous",
    () => {
      message(lastMessage);
    }
  );

  context.subscriptions.push(disposable);
  let disposable2 = vscode.commands.registerCommand("bible-text.bless", () => {
    message();
  });
  context.subscriptions.push(disposable2);
  let disposable3 = vscode.commands.registerCommand(
    "bible-text.restart",
    () => {
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(async () => {
        if (vscode.window.state.focused) {
          message();
        }
      }, parseInt(vscode.workspace.getConfiguration("bibletext").get("duration") || "1") * 60 * 1000);
    }
  );
  context.subscriptions.push(disposable3);
}

async function message(_message) {
  let data;
  if (_message) {
    data = _message;
  } else {
    data = await fetch(
      "https://beta.ourmanna.com/api/v1/get/?format=json&order=random"
    );
    data = await data.json();
  }
  lastMessage = data;
  vscode.window
    .showInformationMessage(
      data.verse.details.text,
      {
        modal: false,
      },
      "Copy",
      data.verse.details.reference
    )
    .then((e) => {
      if (e == "Copy") {
        vscode.env.clipboard.writeText(
          data.verse.details.text + " - " + data.verse.details.reference
        );
      } else if (e == data.verse.details.reference) {
        let url = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(
          data.verse.details.reference
        )}&version=NASB;UKR`;
        vscode.env.openExternal(vscode.Uri.parse(url));
      }
    });
}

function deactivate() {
  if (interval) {
    clearInterval(interval);
  }
}

module.exports = {
  activate,
  deactivate,
};