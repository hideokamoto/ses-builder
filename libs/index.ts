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
    MailBodyHelper: SESMailBodyHelper.init(),
    MailContentHelper: SESMailContentHelper.init(),
    MailDestinationHelper: SESMailDestinationHelper.init(),
    MailMessageHelper: SESMailMessageHelper.init(),
    MessageTagHelper: SESMessageTagHelper.init(),
    MessageTagListHelper: SESMessageTagListHelper.init(),
    SendMailBuilder: SESSendMailFactory.init()
}

export default SESBuilder
module.exports = SESBuilder
