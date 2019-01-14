import {
    SESMailBodyHelper,
    SESMailContentHelper,
    SESMailDestinationHelper,
    SESMailMessageHelper,
    SESMessageTagHelper,
    SESMessageTagListHelper,
    SESSendMailFactory
} from '../../libs/SendMailFactory'
import {Tag} from "aws-sdk/clients/resourcegroupstaggingapi";

const func = () => true

describe('SESMailContentHelper', () => {
    it('just return default props', () => {
        const helper = SESMailContentHelper.init()
        expect(helper.getContent()).toEqual({
            Data: ''
        })
    })
    it('return message', () => {
        const helper = SESMailContentHelper.init()
        helper.setMessageData('hello')
        expect(helper.getContent()).toEqual({
            Data: 'hello'
        })
    })
    it('return message with charset', () => {
        const helper = SESMailContentHelper.init()
        helper.setMessageData('hello')
        helper.setCharset('utf-8')
        expect(helper.getContent()).toEqual({
            Data: 'hello',
            Charset: 'utf-8'
        })
    })
    it('return message with charset', () => {
        const helper = SESMailContentHelper.init()
        helper.setMessageData('hello', 'utf-8')
        expect(helper.getContent()).toEqual({
            Data: 'hello',
            Charset: 'utf-8'
        })
    })
})

describe('SESMailDestinationHelper', () => {
    it('should return empty by default', () => {
        const helper = SESMailDestinationHelper.init()
        expect(helper.getDestination()).toEqual({})
    })
    describe('to address', () => {
        it('should return valid object when give a double', () => {
            const helper = SESMailDestinationHelper.init()
            helper.putToAddresses('hoge@example.com')
            helper.putToAddresses('fuga@example.com')
            expect(helper.getDestination()).toEqual({
                ToAddresses: [
                    'hoge@example.com',
                    'fuga@example.com'
                ]
            })
        })
        it('should return valid object when give a single', () => {
            const helper = SESMailDestinationHelper.init()
            helper.putToAddresses('hoge@example.com')
            expect(helper.getDestination()).toEqual({
                ToAddresses: [
                    'hoge@example.com'
                ]
            })
        })
        it('should return valid object when given as array', () => {
            const helper = SESMailDestinationHelper.init()
            helper.setToAddresses([
                'hoge@example.com',
                'fuga@example.com'
            ])
            expect(helper.getDestination()).toEqual({
                ToAddresses: [
                    'hoge@example.com',
                    'fuga@example.com'
                ]
            })
        })
    })
    describe('cc address', () => {
        it('should return valid object when give a double', () => {
            const helper = SESMailDestinationHelper.init()
            helper.putCcAddresses('hoge@example.com')
            helper.putCcAddresses('fuga@example.com')
            expect(helper.getDestination()).toEqual({
                CcAddresses: [
                    'hoge@example.com',
                    'fuga@example.com'
                ]
            })
        })
        it('should return valid object when give a single', () => {
            const helper = SESMailDestinationHelper.init()
            helper.putCcAddresses('hoge@example.com')
            expect(helper.getDestination()).toEqual({
                CcAddresses: [
                    'hoge@example.com'
                ]
            })
        })
        it('should return valid object when given as array', () => {
            const helper = SESMailDestinationHelper.init()
            helper.setCcAddresses([
                'hoge@example.com',
                'fuga@example.com'
            ])
            expect(helper.getDestination()).toEqual({
                CcAddresses: [
                    'hoge@example.com',
                    'fuga@example.com'
                ]
            })
        })
    })

    describe('bcc address', () => {
        it('should return valid object when give a double', () => {
            const helper = SESMailDestinationHelper.init()
            helper.putBccAddresses('hoge@example.com')
            helper.putBccAddresses('fuga@example.com')
            expect(helper.getDestination()).toEqual({
                BccAddresses: [
                    'hoge@example.com',
                    'fuga@example.com'
                ]
            })
        })
        it('should return valid object when give a single', () => {
            const helper = SESMailDestinationHelper.init()
            helper.putBccAddresses('hoge@example.com')
            expect(helper.getDestination()).toEqual({
                BccAddresses: [
                    'hoge@example.com'
                ]
            })
        })
        it('should return valid object when given as array', () => {
            const helper = SESMailDestinationHelper.init()
            helper.setBccAddresses([
                'hoge@example.com',
                'fuga@example.com'
            ])
            expect(helper.getDestination()).toEqual({
                BccAddresses: [
                    'hoge@example.com',
                    'fuga@example.com'
                ]
            })
        })
    })
    describe('multipile pattern', () => {
        it('should return to and cc', () => {
            const helper = SESMailDestinationHelper.init()
            helper.putToAddresses('hoge@example.com')
            helper.putBccAddresses('fuga@example.com')
            expect(helper.getDestination()).toEqual({
                ToAddresses: [
                    'hoge@example.com',
                ],
                BccAddresses: [
                    'fuga@example.com'
                ]
            })
        })
    })
})
describe('SESMailMessageHelper', () => {
    it('should return default object', () => {
        const helper = SESMailMessageHelper.init()
        expect(helper.getMessage()).toEqual({
            Subject: {
                Data: ''
            },
            Body: {}
        })
    })
    describe('#putBody()', () => {
        it('should return default object', () => {
            const helper = SESMailMessageHelper.init()
            helper.putBody({})
            expect(helper.getMessage()).toEqual({
                Subject: {
                    Data: ''
                },
                Body: {}
            })
        })

        it('should return text body object', () => {
            const helper = SESMailMessageHelper.init()
            helper.putBody({
                text: 'hello'
            })
            expect(helper.getMessage()).toEqual({
                Subject: {
                    Data: ''
                },
                Body: {
                    Text: {
                        Data: 'hello'
                    }
                }
            })
        })

        it('should return Html body object', () => {
            const helper = SESMailMessageHelper.init()
            helper.putBody({
                html: 'hello'
            })
            expect(helper.getMessage()).toEqual({
                Subject: {
                    Data: ''
                },
                Body: {
                    Html: {
                        Data: 'hello'
                    }
                }
            })
        })

        it('should return object includes charset', () => {
            const helper = SESMailMessageHelper.init()
            helper.putBody({
                text: 'hello',
                html: 'world',
                charset: 'utf-8'
            })
            expect(helper.getMessage()).toEqual({
                Subject: {
                    Data: ''
                },
                Body: {
                    Text: {
                        Data: 'hello',
                        Charset: 'utf-8'
                    },
                    Html: {
                        Data: 'world',
                        Charset: 'utf-8'
                    },
                }
            })
        })
    })
})
describe('SESMessageTagHelper', () => {
    it('should return default object', () => {
        const helper = SESMessageTagHelper.init()
        expect(helper.getMessageTag()).toEqual({
            Name: '',
            Value: ''
        })
    })
    it('should return default object', () => {
        const helper = SESMessageTagHelper.init()
        helper.setTag('hello', 'world')
        expect(helper.getMessageTag()).toEqual({
            Name: 'hello',
            Value: 'world'
        })
    })
})
describe('SESMessageTagListHelper', () => {
    it('should return default object', () => {
        const helper = SESMessageTagListHelper.init()
        expect(helper.getMessageTagLists()).toEqual([])
    })
    it('should return single tag', () => {
        const helper = SESMessageTagListHelper.init()
        helper.addTag({
            Name: 'Hello',
            Value: 'world'
        })
        expect(helper.getMessageTagLists()).toEqual([{
            Name: 'Hello',
            Value: 'world'
        }])
    })
    it('should return double tag', () => {
        const helper = SESMessageTagListHelper.init()
        helper.putTag('Hello', 'world')
        helper.putTag('Goodbye', 'world')
        expect(helper.getMessageTagLists()).toEqual([{
            Name: 'Hello',
            Value: 'world'
        }, {
            Name: 'Goodbye',
            Value: 'world'
        }])
    })
})
describe('SESSendMailFactory', () => {
    it('default', () => {
        const helper = SESSendMailFactory.init()
        expect(helper.getParams()).toEqual({
            Source: '',
            Destination: {},
            Message: {
                Subject: {
                    Data: ''
                },
                Body: {}
            }
        })
    })

    it('default', () => {
        const builder = SESSendMailFactory.init()
        builder.setSource('hoge@example.com')

        const DestinationHelper = SESMailDestinationHelper.init()
        DestinationHelper.putToAddresses('hello@example.com')
        builder.setDestination(DestinationHelper.getDestination())

        const MessageHelper = SESMailMessageHelper.init()
        MessageHelper.putBody({
            text: 'hello'
        })
        builder.setMessage(MessageHelper.getMessage())

        builder.setReplyToAddresses(['hi@example.com'])
        builder.setReturnPath('second@example.com')
        builder.setReturnPathArn('amazon.arn')
        builder.setSource('from@example.com')
        builder.setSourceArn(('arn.amazon'))

        const TagHelper = SESMessageTagListHelper.init()
        TagHelper.putTag('Name', 'Hello')
        builder.setTags(TagHelper.getMessageTagLists())

        expect(builder.getParams()).toEqual({
            Source: 'from@example.com',
            SourceArn: 'arn.amazon',
            ReturnPath: 'second@example.com',
            ReturnPathArn: 'amazon.arn',
            ReplyToAddresses: [
                'hi@example.com'
            ],
            Destination: {
                ToAddresses: [
                    'hello@example.com'
                ]
            },
            Message: {
                Subject: {
                    Data: ''
                },
                Body: {
                    Text: {
                        Data: 'hello'
                    }
                }
            },
            Tags: [
                {
                    Name: 'Name',
                    Value: 'Hello'
                }
            ]
        })
    })
})

describe('SESMailBodyHelper', () => {
    it('should get empty', () => {
        const helper = SESMailBodyHelper.init()
        expect(helper.getBody()).toEqual({})
    })
    it('should get body data with text', () => {
        const helper = SESMailBodyHelper.init()
        helper.setText({
            Data: 'test'
        })
        expect(helper.getBody()).toEqual({
            Text: {
                Data: 'test'
            }
        })
    })
    it('should get body data with html', () => {
        const helper = SESMailBodyHelper.init()
        helper.setHtml({
            Data: 'test'
        })
        expect(helper.getBody()).toEqual({
            Html: {
                Data: 'test'
            }
        })
    })
    it('should get body data with html with charset', () => {
        const helper = SESMailBodyHelper.init()
        helper.setHtml({
            Data: 'test',
            Charset: 'utf-8'
        })
        expect(helper.getBody()).toEqual({
            Html: {
                Data: 'test',
                Charset: 'utf-8'
            }
        })
    })
    it('should get body data with html with charset', () => {
        const helper = SESMailBodyHelper.init()
        helper.setHtml({
            Data: 'test',
            Charset: 'utf-8'
        })
        helper.setText({
            Data: 'test'
        })
        expect(helper.getBody()).toEqual({
            Html: {
                Data: 'test',
                Charset: 'utf-8'
            },
            Text: {
                Data: 'test'
            }
        })
    })
})
