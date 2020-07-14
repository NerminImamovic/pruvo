import { Squiss, Message } from 'squiss-ts';
import axios from 'axios';
import MessageData from './types/MessageData';

const URL_RATES_API = `https://openexchangerates.org/api/latest.json`;
const ID_RATES_API = `8a07c981c8e946cea8347c754823f26d`;
const URL_SQS_QUEUE = `http://localhost`;
const SQS_PORT = `9324`;

const awsConfig = {
  accessKeyId: `dummy`,
  secretAccessKey: `dummfy`,
  region: `dummy`,
  endpoint: `${URL_SQS_QUEUE}:${SQS_PORT}`,
};

const squiss = new Squiss({
  awsConfig,
  queueName: `default`,
  bodyFormat: `json`,
});

class App {
  public USDRates: Map<string, number>;

  constructor() {
    this.USDRates = new Map<string, number>();
    this.run();
  }

  private async run(): Promise<void> {
    await this.getRates();
    this.processData();
  }

  /*
   * Send emial with the rate between currencies
   */
  private sendEmail(data: MessageData): void {
    console.log(data);
    if (data.from && data.to) {
      const rate: number = (this.USDRates.get(data.to) as number) / (this.USDRates.get(data.from) as number);
      console.log(`Data ready to send: email: ${data.email} - ${data.from} - ${data.to}: ${rate}`);
    } else {
      console.log(`Currency error, impossible to send email to: ${data.email}`);
    }
  }

  /*
   * Get rates and update the map with currencies changes
   */
  private async getRates(): Promise<void> {
    try {
      const response = await axios.get(`${URL_RATES_API}?app_id=${ID_RATES_API}`);
      Object.entries(response.data.rates).forEach((rate) => {
        this.USDRates.set(rate[0] as string, rate[1] as number);
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*
   * Start SQS connection and start to listen messages to process
   */
  private processData(): void {
    squiss
      .start()
      .then(() => console.log(`connection start ok`))
      .catch((err) => console.log(err));

    squiss.on(`message`, (message: Message) => {
      console.log(`${message.body.name} says: ${JSON.stringify(message.body.message)}`);
      this.sendEmail(message.body.message);
      message.del();
    });
  }
}

export default new App();
