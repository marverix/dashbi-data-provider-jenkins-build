# dashbi-data-provider-jenkins-build

Dashbi data provider that fetches last build for given Jenkins job.

## Usage

### Install

```sh
npm install --save dashbi-data-provider-jenkins-build
```

### Register

Dashbi should detect and auto-register data provider.

### Config Source

You need to provide to params:

* `jenkinsUrl`
* `jobPath`

### Example

Let's say that your Jenkins Job URL is `https://myjenkins.example.org/job/Hello/`.
Your widget configuration could look like this:

```js
dashbiLayout.addWidget({
  name: 'jenkins-build-status',
  title: 'My Jenkins Job',
  source: {
    name: 'jenkins-build',
    params: {
      jenkinsUrl: 'https://myjenkins.example.org',
      jobPath: 'job/Hello'
    }
  }
});
```

### Widget

Widget created to display build status is [jenkins-build-status](https://github.com/marverix/dashbi-widget-jenkins-build-status)
