package interpreter;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Controller exposing the REST endpoint for running Speek code.
 */
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

    @PostMapping("/run")
    public RunResponse runCode(@RequestBody RunRequest request) {
        if (request == null || request.getCode() == null) {
            RunResponse response = new RunResponse();
            response.setSuccess(false);
            response.setOutput("");
            response.setErrors(Collections.singletonList("Code field cannot be null"));
            return response;
        }

        List<String> errors = new ArrayList<>();
        boolean success = false;
        String output = "";

        try {
            ThreadLocalPrintStream.startCapture();
            Interpreter interpreter = new Interpreter();
            interpreter.run(request.getCode());
            output = ThreadLocalPrintStream.stopCapture();
            success = true;
        } catch (RuntimeException e) {
            errors.add(e.getMessage());
        } finally {
            // Ensure thread-local buffer cleanup to prevent memory leaks
            String remaining = ThreadLocalPrintStream.stopCapture();
            if (!success) {
                output = remaining;
            }
        }

        RunResponse response = new RunResponse();
        response.setSuccess(success);
        // Normalize output newlines and trim leading/trailing whitespace
        response.setOutput(output.replace("\r\n", "\n").trim());
        response.setErrors(errors);
        return response;
    }

    public static class RunRequest {
        private String code;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }

    public static class RunResponse {
        private boolean success;
        private String output;
        private List<String> errors;

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getOutput() {
            return output;
        }

        public void setOutput(String output) {
            this.output = output;
        }

        public List<String> getErrors() {
            return errors;
        }

        public void setErrors(List<String> errors) {
            this.errors = errors;
        }
    }
}
