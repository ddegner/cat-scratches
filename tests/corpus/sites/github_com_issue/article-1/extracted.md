[nodejs](/nodejs) / **[node](/nodejs/node)** Public

* [Notifications](/login?return_to=%2Fnodejs%2Fnode)
* [Fork 35.5k](/login?return_to=%2Fnodejs%2Fnode)
* [Star](/login?return_to=%2Fnodejs%2Fnode)

# installer will not overwrite user's .npmrc, even if invalid #12345

Copy link

Copy link

Closed

Closed

[installer will not overwrite user's .npmrc, even if invalid](#top)#12345

Copy link

Labels

[feature request](https://github.com/nodejs/node/issues?q=state%3Aopen%20label%3A%22feature%20request%22)Issues that request new features to be added to Node.js.[install](https://github.com/nodejs/node/issues?q=state%3Aopen%20label%3A%22install%22)Issues and PRs related to the installers.

opened [on Apr 11, 2017](https://github.com/nodejs/node/issues/12345#issue-221064271)

Issue body actions

### supporting information:

* installer: nodejs-v7.8.0-x64.msi
* `node -v` prints: 7.8.0
* os: windows 10.0.16170

### reproduce

the Node.js binary itself is in the PATH, but the globally installed packages are not. 
I reinstalled the latest nodejs( using nodejs-v7.8.0-x64.msi), and expect the installer can fix it. But it did not.

If need some more info, please let me know.

Reactions are currently unavailable

## Metadata

### Assignees

No one assigned

### Labels

[feature request](https://github.com/nodejs/node/issues?q=state%3Aopen%20label%3A%22feature%20request%22)Issues that request new features to be added to Node.js.[install](https://github.com/nodejs/node/issues?q=state%3Aopen%20label%3A%22install%22)Issues and PRs related to the installers.

### Type

No type

### Projects

No projects

### Milestone

No milestone

### Relationships

None yet

### Development

No branches or pull requests
