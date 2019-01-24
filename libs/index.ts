import {
    SESMailBodyHelper,
    SESMailContentHelper,
    SESMailDestinationHelper,
    SESMailMessageHelper,
    SESMessageTagHelper,
    SESMessageTagListHelper,
    SESSendMailFactory
} from './SendMailFactory'
import {
    MessageBuilder,
    MessageTagBuilder,
    MessageTagListBuilder,
    SESSendMailBuilder,
    DestinationBuilder,
    ContentBuilder,
    MailBodyBuilder
} from './SendMailBuilder'

export namespace service {
    export interface interfaces {
        MailBodyBuilder: MailBodyBuilder
        MessageTagBuilder: MessageTagBuilder
        MessageTagListBuilder: MessageTagListBuilder
        SESSendMailBuilder: SESSendMailBuilder
        DestinationBuilder: DestinationBuilder
        ContentBuilder: ContentBuilder
    }
    export interface SESBuilder {
        MailBodyHelper: {
            init(): MailBodyBuilder
        },
        MailContentHelper: {
            init(): ContentBuilder,
        },
        MailDestinationHelper: {
            init(): DestinationBuilder,
        },
        MailMessageHelper: {
            init(): MessageBuilder,
        },
        MessageTagHelper: {
            init(): MessageTagBuilder,
        },
        MessageTagListHelper: {
            init(): MessageTagListBuilder,
        },
        SendMailFactory: {
            init(): SESSendMailBuilder
        },
    }
}

const SESBuilder = {
    MailBodyHelper: SESMailBodyHelper,
    MailContentHelper: SESMailContentHelper,
    MailDestinationHelper: SESMailDestinationHelper,
    MailMessageHelper: SESMailMessageHelper,
    MessageTagHelper: SESMessageTagHelper,
    MessageTagListHelper: SESMessageTagListHelper,
    SendMailFactory: SESSendMailFactory
}

export default SESBuilder
module.exports = SESBuilder
