const Mixpanel = require('mixpanel');

let analytics;

if(process.env.ANALYTICS_TOKEN) {
    analytics = Mixpanel.init(process.env.ANALYTICS_TOKEN);
} else {
    analytics = {
        track: () => null,
    }
    console.warn("Starting application without analytics");
}

module.exports = analytics;
