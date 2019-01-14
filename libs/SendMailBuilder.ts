
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

export interface ContentBuilder {
    setMessageData(subject: MessageData, charset?: Charset): ContentBuilder
    setCharset(charset: Charset): ContentBuilder
    getContent(): Content
}

export interface MailBodyBuilder {
    setText(text: Content): MailBodyBuilder
    setHtml(html: Content): MailBodyBuilder
    getBody(): Body
}

export interface MessageBuilder {
    putBody(body: {text?: MessageData, html?: MessageData, charset?: Charset}): MessageBuilder
    putSubject(subject: MessageData, charset: Charset): MessageBuilder
    setSubject(subject: Content): MessageBuilder
    setBody(body: Body): MessageBuilder
    getMessage(): Message
}

export interface DestinationBuilder {
    putToAddresses(address: Address): DestinationBuilder
    putCcAddresses(address: Address): DestinationBuilder
    putBccAddresses(address: Address): DestinationBuilder
    setToAddresses(addresses: AddressList): DestinationBuilder
    setCcAddresses(addresses: AddressList): DestinationBuilder
    setBccAddresses(addresses: AddressList): DestinationBuilder
    getDestination(): Destination
}

export interface MessageTagBuilder {
    setTag(name: MessageTagName, value: MessageTagName): MessageTagBuilder
    getMessageTag(): MessageTag
}

export interface MessageTagListBuilder {
    addTag(tag: MessageTag): MessageTagListBuilder
    putTag(name: MessageTagName, value: MessageTagName): MessageTagListBuilder
    getMessageTagLists(): MessageTagList
}

export interface SESSendMailBuilder {
    setSource(source: Address): SESSendMailBuilder
    setDestination(destination: Destination): SESSendMailBuilder
    setMessage(message: Message): SESSendMailBuilder
    setReplyToAddresses(addresses: AddressList): SESSendMailBuilder
    setReturnPath(address: Address): SESSendMailBuilder
    setReturnPathArn(arn: AmazonResourceName): SESSendMailBuilder
    setSourceArn(arn: AmazonResourceName): SESSendMailBuilder
    setTags(tagList: MessageTagList): SESSendMailBuilder
    setConfigurationSetName(configurationSetName: ConfigurationSetName): SESSendMailBuilder
    getParams(): SendEmailRequest
}
