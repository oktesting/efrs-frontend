// import * as Sentry from "@sentry/browser";
function init() {
    // Sentry.init({
    //   dsn: "https://6fd2a1b531694c8cb45e4e64df295962@sentry.io/1881494",
    //   release: "1.0.0",
    //   environment: "development-test"
    // });
  }
  
  function log(error) {
    // Sentry.captureException(error);
    console.log(error);
  }
  
  export default {
    init,
    log
  };
  