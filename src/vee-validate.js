import { extend } from "vee-validate";
import { min, required, email } from "vee-validate/dist/rules";

// Install rules
extend("min", min);
extend("email", email);
extend("required", {
    ...required,
    message: "必填欄位"
  });
