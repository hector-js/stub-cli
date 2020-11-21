# @hectorjs/stub-cli

![](https://github.com/hector-js/stub-cli/workflows/%40hectorjs%2Fstub%2Dcli/badge.svg)
 - ![](https://github.com/hector-js/stub-cli/workflows/eslint%2Dconfig%2Dgoogle/badge.svg) ![](https://github.com/hector-js/stub-backend/workflows/Unit%20tests/badge.svg) ![](https://github.com/hector-js/stub-backend/workflows/Coverage/badge.svg) ![](https://github.com/hector-js/stub-backend/workflows/Audit/badge.svg)

 - ![](https://img.shields.io/npm/v/@hectorjs/stub-cli?label=version&logo=npm) ![](https://img.shields.io/npm/dt/@hectorjs/stub-cli?logo=npm&logoColor=blue) ![](https://img.shields.io/snyk/vulnerabilities/npm/@hectorjs/stub-cli?logo=snyk) ![](https://img.shields.io/github/last-commit/hector-js/stub-cli?logo=github)

 [Releases documentation](https://github.com/hector-js/stub-cli/releases)


# Description

The aim of this project is to mock backend services building different responses for a given authentication, cookie or request among others.

_stub-cli_ is a command line which helps you to create new projects, generate methods and test template.

Keep it simple :smile:

# Install

Install the library:

Globally (recommended):
```
npm install -g @hectorjs/stub-cli
```
or locally:

```
npm install @hectorjs/stub-cli --save-dev
```

Verify your **hjs** command is installed correctly.

```sh
hjs --version
```

```sh
hjs --help
```

# Commands

## 1) ```hjs --help```

It will display posible options available in the library.

## 2) ```hjs new/n [name-mock-service]```  

It creates a new project with the name provided in the brakets.

_Example:_ ```hjs new mock-service```

You can add the option ```--vs``` or ```--idea``` to open the IDE.

If you execute the command without project name (```hjs new```), the terminal will ask you for a new project (```Create new project? [Yn] ```). Response _y_ when you want to create it (This is like ```hjs new [name-project]```) or response _n_ when you want to set in your own package.json project.

_MORE INFO:_ ```hjs new --help```

## 3) ```hjs generate/g [method] [name-path]```

It will generate a method template resource with a test. For example , ```hjs g get customers/{id}/business?product={param}```). More info: ```hjs g --help```.
You can generate different methods like get, head, post, delete among others.

For each method, it creates a test with dummy data. It will reduce the time to test the mock. Give it a try. 

The request and response are json by default. If you want to create a scenario for xml, you have to include ```--xml``` in you cli.

You can group each resource using the --package with the name of the folder where resource will be place.

For example: ```hjs g g customers --package customer```

_NOTE:_ The endpoint should not start with '/' for the cli and you should escape '&' like the next example:

```hjs g post customers/{id}/products?query={param1}\&identifier={identifier}```
_MORE INFO:_ ```hjs generate --help```

## 4) ```hjs test```

Execute the tests which have been created by each method generate command (```hjs g get ...```). You can add different properties to the command as port, logs or profile.

_NOTE_: you can run ```npm test``` as well.
_MORE INFO:_ ```hjs test --help```

## 5) ```hjs config [prop]```

Create a config file (_.hjs.config.json_) where you can set the logs, port, among others settings. 

```hjs config --port 8090 --logs tiny --banner```

The library use morgan library for the logs, so you can add different kind of logs as tiny, common...

_MORE INFO:_ ```hjs config --help```

## 6) ```hjs start```
If you want to run the mock ```hjs start```. Also if you want to run the mocks with nodemon listening the changes under the resources folder, execute ```hjs start --dev```.

_NOTE:_ you can run ```npm start``` as well.
_MORE INFO:_ ```hjs start --help```

# UI

This section is in progress at this moment.

You can run the application and navigate to ```http://localhost:3005/``` and have a look.

# Example

Once you create a new project, it is adding a health check endpoint by default with its test.

Let's create a project called ```mock-service```

```sh
hjs new mock-service
```

We navigate to the mock-service root and execute the test:

```sh
hjs test
```
You will see there is already a health check endpoint by default.

If you want to run the server and test it. You need to execute the start command:

```sh
hjs start
```

The service will be running in the port *3005* waiting for a request.

Make a request:

```sh
curl http://localhost:3005/health
```

The response will be like this:

```json
{
    "STATUS": "UP"
}
```

Now you can start adding new methods for your project.

Enjoy!
:heart:

# Respository

https://github.com/hector-js/stub-cli
