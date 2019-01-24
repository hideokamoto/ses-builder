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

export interface SESBuilder {
    MailBodyHelper: MailBodyBuilder,
    MailContentHelper: ContentBuilder,
    MailDestinationHelper: DestinationBuilder,
    MailMessageHelper: MessageBuilder,
    MessageTagHelper: MessageTagBuilder,
    MessageTagListHelper: MessageTagListBuilder,
    SendMailBuilder: SESSendMailBuilder
}

const SESBuilder = {
    MailBodyHelper: SESMailBodyHelper,
    MailContentHelper: SESMailContentHelper,
    MailDestinationHelper: SESMailDestinationHelper,
    MailMessageHelper: SESMailMessageHelper,
    MessageTagHelper: SESMessageTagHelper,
    MessageTagListHelper: SESMessageTagListHelper,
    SESSendMailFactory
}

export default SESBuilder
module.exports = SESBuilder
