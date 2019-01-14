# Amazon SES parameter builder
[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/ses-builder.png?style=flat-square
[npm]: https://www.npmjs.org/package/ses-builder

Easy to create a request object to execute `ses.sendEmail`.

## Getting started


```bash
$ npm i -S ses-builder aws-sdk
```

## Usage

```typescript
import { SES } from 'aws-sdk'
import {SendMailBuilder, MailDestinationHelper, MailMessageHelper} from 'ses-builder'

// set source
SendMailBuilder.setSource('hoge@example.com')

// Set destination
MailDestinationHelper.putToAddresses('hello@example.com')
SendMailBuilder.setDestination(MailDestinationHelper.getDestination())

// set message
MailMessageHelper.putBody({
    text: 'hello'
})
SendMailBuilder.setMessage(MailMessageHelper.getMessage())

// set reply address
SendMailBuilder.setReplyToAddresses(['hi@example.com'])

const ses = new SES()
ses.sendEmail(SendMailBuilder.getParams()).promise()
```

## Testing

```bash
$ git clone git@github.com:hideokamoto/ses-builder.git
$ cd ses-builder
$ npm install
$ npm test -- --watch
```
