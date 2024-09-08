const {DisplayProcessor, SpecReporter, StacktraceOption} = require('jasmine-spec-reporter');
const SuiteInfo = require('jasmine-spec-reporter').SuiteInfo;

class CustomProcessor extends DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `JavaScript ${log}`;
    }

    displaySuite(suite, log) {
        return `Suite ${log}`;
    }

    displaySuccessfulSpec(spec, log) {
        return `Spec ${log}`;
    }

    displayFailedSpec(spec, log) {
        return `Spec ${log}`;
    }

    displaySpecErrorMessages(spec, log) {
        return `Spec ${log}`;
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
);