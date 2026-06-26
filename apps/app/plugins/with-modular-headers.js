const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

/**
 * Required for @react-native-google-signin/google-signin v16 without Firebase.
 * Adds `use_modular_headers!` to the Podfile so AppCheckCore can resolve
 * GoogleUtilities and RecaptchaInterop as modules.
 */
module.exports = function withModularHeaders(config) {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      let contents = fs.readFileSync(podfilePath, "utf-8");

      if (!contents.includes("use_modular_headers!")) {
        contents = contents.replace(
          /^(platform :ios.*)/m,
          "use_modular_headers!\n$1"
        );
        fs.writeFileSync(podfilePath, contents);
      }

      return config;
    },
  ]);
};
