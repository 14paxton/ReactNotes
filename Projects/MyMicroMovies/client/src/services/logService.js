import * as Sentry from "@sentry/browser";

// docs https://docs.sentry.io/platforms/javascript/react/

function init(){
  Sentry.init({
    dsn: "https://6d2a28d2fac8494cb37390acd1b5e5f9@sentry.io/1844016",
    release: "1-0-0",
    environment: "development-test"
  });
}

function log(error){
  Sentry.captureException(error);
}


export default {
  init,
  log
};
