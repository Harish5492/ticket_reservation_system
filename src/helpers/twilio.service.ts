import * as twilio from 'twilio';
import { EM } from '../constants';

class TwilioHelper {
  private client: any;

  constructor() {
    const accountSid = EM.TWILIO.ACCOUNTSID;
    const authToken = EM.TWILIO.AUTHTOKEN;
    this.client = twilio(accountSid, authToken);
  }
  async sendMessage(options: {
    to: string;
    otp: string | number;
  }): Promise<void> {
    const { otp } = options;

    try {
      const message = await this.client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+12182280015',
        to: '+918872512811',
      });
      console.log('Message sent. SID:', message.sid);
    } catch (error) {
      console.log('Error:', error);
    }
  }
}

export default new TwilioHelper();
