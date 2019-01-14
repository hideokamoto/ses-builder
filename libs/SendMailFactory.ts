import {
    MessageBuilder,
    MessageTagBuilder,
    MessageTagListBuilder,
    SESSendMailBuilder,
    DestinationBuilder,
    ContentBuilder,
    MailBodyBuilder
} from './SendMailBuilder'

import {
    SendEmailRequest,
    Address,
    AddressList,
    AmazonResourceName,
    ConfigurationSetName,
    Destination,
    Message,
    MessageTag,
    MessageTagList,
    Content,
    Body,
    MessageData,
    Charset,
    MessageTagName,
} from "aws-sdk/clients/ses";

export class SESMailContentHelper {
    public static init(): ContentBuilder {
        const message: Content = {
            Data: ''
        }
        return {
            setMessageData(data: MessageData, charset: Charset = ''): ContentBuilder {
                message.Data = data
                if (charset) this.setCharset(charset)
                return this
            },
            setCharset(charset: Charset): ContentBuilder {
                message.Charset = charset
                return this
            },
            getContent(): Content {
                return message
            },
        }
    }
}

export class SESMailBodyHelper {
    public static init(): MailBodyBuilder {
        const body: Body = {}
        return {
            setText(text: Content): MailBodyBuilder {
                body.Text = text
                return this
            },
            setHtml(html: Content): MailBodyBuilder {
                body.Html = html
                return this
            },
            getBody(): Body {
                return body
            },
        }
    }
}

export class SESMailMessageHelper {
    public static init(): MessageBuilder {
        const message: Message = {
            Subject: {
                Data: ''
            },
            Body: {}
        }
        return {
            putBody(body: {text?: MessageData, html?: MessageData, charset?: Charset}): MessageBuilder {
                const { text, html, charset } = body
                const bodyHelper = SESMailBodyHelper.init()
                if (text) {
                    const contentHelper = SESMailContentHelper.init()
                    contentHelper.setMessageData(text)
                    if (charset) contentHelper.setCharset(charset)
                    bodyHelper.setText(contentHelper.getContent())
                }
                if (html) {
                    const contentHelper = SESMailContentHelper.init()
                    contentHelper.setMessageData(html)
                    if (charset) contentHelper.setCharset(charset)
                    bodyHelper.setHtml(contentHelper.getContent())
                }
                this.setBody(bodyHelper.getBody())
                return this
            },
            putSubject(subject: MessageData, charset: Charset): MessageBuilder {
                const helper = SESMailContentHelper.init()
                helper.setMessageData(subject).setCharset(charset)
                this.setSubject(helper.getContent())
                return this
            },
            setSubject(subject: Content): MessageBuilder {
                message.Subject = subject
                return this
            },
            setBody(body: Body): MessageBuilder {
                message.Body = body
                return this
            },
            getMessage(): Message {
                return message
            },
        }
    }
}

export class SESMailDestinationHelper {
    public static init(): DestinationBuilder {
        const destination:Destination = {}
        return {
            putToAddresses(address: Address): DestinationBuilder {
                if (!destination.ToAddresses) {
                    destination.ToAddresses = [address]
                    return this
                }
                destination.ToAddresses.push(address)
                return this
            },
            putCcAddresses(address: Address): DestinationBuilder {
                if (!destination.CcAddresses) {
                    destination.CcAddresses = [address]
                    return this
                }
                destination.CcAddresses.push(address)
                return this
            },
            putBccAddresses(address: Address): DestinationBuilder {
                if (!destination.BccAddresses) {
                    destination.BccAddresses = [address]
                    return this
                }
                destination.BccAddresses.push(address)
                return this
            },
            setToAddresses(addresses: AddressList): DestinationBuilder {
                destination.ToAddresses = addresses
                return this
            },
            setCcAddresses(addresses: AddressList): DestinationBuilder {
                destination.CcAddresses = addresses
                return this
            },
            setBccAddresses(addresses: AddressList): DestinationBuilder {
                destination.BccAddresses = addresses
                return this
            },
            getDestination(): Destination {
                return destination
            },
        }
    }
}

export class SESMessageTagHelper {
    public static init(): MessageTagBuilder {
        const tag: MessageTag = {
            Name: '',
            Value: '',
        }
        return {
            setTag(name: MessageTagName, value: MessageTagName): MessageTagBuilder {
                tag.Name = name
                tag.Value = value
                return this
            },
            getMessageTag(): MessageTag {
                return tag
            }
        }
    }
}

export class SESMessageTagListHelper {
    public static init(): MessageTagListBuilder {
        const params: MessageTagList = []
        return {
            addTag(tag: MessageTag): MessageTagListBuilder {
                params.push(tag)
               return this
            },
            putTag(name: MessageTagName, value: MessageTagName): MessageTagListBuilder {
                const helper = SESMessageTagHelper.init()
                const tag = helper.setTag(name, value)
                params.push(tag.getMessageTag())
                return this
            },
            getMessageTagLists(): MessageTagList {
               return params
            },
        }
    }
}

export class SESSendMailFactory {
    public static init(): SESSendMailBuilder {
        const params: SendEmailRequest = {
            Source: '',
            Destination: {},
            Message: {
                Subject: {
                    Data: ''
                },
                Body: {}
            }
        }
        return {
            setSource(source: Address): SESSendMailBuilder {
                params.Source = source
                return this
            },
            setDestination(destination: Destination): SESSendMailBuilder {
                params.Destination = destination
                return this
            },
            setMessage(message: Message): SESSendMailBuilder {
                params.Message = message
                return this
            },
            setReplyToAddresses(addresses: AddressList): SESSendMailBuilder {
                params.ReplyToAddresses = addresses
                return this
            },
            setReturnPath(address: Address): SESSendMailBuilder {
                params.ReturnPath = address
                return this
            },
            setReturnPathArn(arn: AmazonResourceName): SESSendMailBuilder {
                params.ReturnPathArn = arn
                return this
            },
            setSourceArn(arn: AmazonResourceName): SESSendMailBuilder {
                params.SourceArn = arn
                return this
            },
            setTags(tagList: MessageTagList): SESSendMailBuilder {
                params.Tags = tagList
                return this
            },
            setConfigurationSetName(configurationSetName: ConfigurationSetName): SESSendMailBuilder {
                params.ConfigurationSetName = configurationSetName
                return this
            },
            getParams(): SendEmailRequest {
                return params
            }

        }
    }
}
