# @hectorjs/stub-cli

![](https://github.com/HecJimSan/stub-cli/workflows/%40hectorjs%2Fstub%2Dcli/badge.svg)
 - ![](https://github.com/HecJimSan/stub-cli/workflows/eslint%2Dconfig%2Dgoogle/badge.svg) ![](https://github.com/HecJimSan/stub-backend/workflows/Unit%20tests/badge.svg) ![](https://github.com/HecJimSan/stub-backend/workflows/Coverage/badge.svg)

 - ![](https://img.shields.io/npm/v/@hectorjs/stub-cli?label=version&logo=npm) ![](https://img.shields.io/npm/dt/@hectorjs/stub-cli?logo=npm&logoColor=blue) ![](https://img.shields.io/snyk/vulnerabilities/npm/@hectorjs/stub-cli?logo=snyk) ![](https://img.shields.io/github/last-commit/HecJimSan/stub-cli?logo=github)

# Description

The aim of this project is to mock backend services building different responses for a given authentication, cookie or request among others.

_stub-cli_ is a command line which helps you to create new projects, generate methods and test template.

Keep it simple :smile:

# CLI

Verify your **hjs** command is installed correctly.

```sh
hjs --version
```

```sh
hjs --help
```

## Commands

### ```hjs --help```

 It will display posible options available in the library.

### ```hjs new/n [name-mock-service]```  

It creates a new project with the name provided in the brakets.

_Example:_ ```hjs new mock-service```

You can add the option ```--vs``` or ```--idea``` to open the IDE.

_MORE INFO:_ ```hjs new --help```

### ```hjs generate/g [method] [name-path]```

It will generate a method template resource with a test. For example , ```hjs g get customers/{id}/business?product={param}```). More info: ```hjs g --help```.
You can generate different methods like get, head, post, delete among others.

For each method, it creates a test with dummy data. It will reduce the time to test the mock. Give it a try. 

The request and response are json by default. If you want to create a scenario for xml, you have to include ```--xml``` in you cli.

_NOTE:_ The endpoint should not start with '/' for the cli and you should escape '&' like the next example:

```hjs g post customers/{id}/products?query={param1}\&identifier={identifier}```
_MORE INFO:_ ```hjs generate --help```

### ```hjs test```

Execute the tests which have been created by each method generate command (```hjs g get ...```).

_NOTE_: you can run ```npm test``` as well.
_MORE INFO:_ ```hjs test --help```

### ```hjs config [prop]```

Create a config file (_.hjs.config.json_) where you can set the logs, port, among others. 

```hjs config --port 8090 --logs tiny```

_MORE INFO:_ ```hjs config --help```

### ```hjs start```
If you want to run the mock ```hjs start```.

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

https://github.com/HecJimSan/stub-cli
