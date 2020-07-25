import * as Sentry from '@sentry/react';


function init() {
    Sentry.init({dsn: "https://cc80c92afee444dea1bf7243b3fd2697@o423587.ingest.sentry.io/5354608"});
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log,
}