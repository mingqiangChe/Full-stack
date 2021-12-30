const Subscription = require("egg").Subscription;
class GetTime extends Subscription {
  static get schedule() {
    return {
      interval: "3m",
      type: "all",
    };
  }
  async subscribe() {
    await this.ctx.service.api.getContent();
  }
}
module.exports = GetTime;
