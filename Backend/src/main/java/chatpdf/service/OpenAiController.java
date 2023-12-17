package chatpdf.service;

// Import statements for required classes and annotations
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

// The @RestController annotation indicates that this class is a controller with 
// methods that define endpoints and their logic in a RESTful web service.
@RestController
// The @RequestMapping annotation at the class level specifies a base URI for all 
// methods within this controller. In this case, the base URI is '/api'.
@RequestMapping("/api")
public class OpenAiController {

    // The @Autowired annotation is used for dependency injection.
    // Here, it automatically injects an instance of OpenAIService into this controller.
    // OpenAIService is assumed to be a Spring-managed component that handles the 
    // business logic, particularly communication with the OpenAI API.
    @Autowired
    private OpenAIService openAIService;

    // The @PostMapping annotation specifies that this method, fetchOpenAIResponse, 
    // is a handler for HTTP POST requests directed to '/api/fetch-openai'.
    // The @RequestParam annotation indicates that this method expects a parameter 
    // named 'prompt' in the incoming request.
    @PostMapping("/fetch-openai")
    public ResponseEntity<String> fetchOpenAIResponse(@RequestParam String prompt) {
        try {
            // Calls the OpenAIService to send the prompt to the OpenAI API and 
            // receives the response as a String.
            String response = openAIService.callOpenAI(prompt);

            // If successful, the method returns an HTTP 200 OK response along with 
            // the received data from the OpenAI API.
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            // In case of an IOException (like a network error), this block catches the 
            // exception and returns an HTTP 500 Internal Server Error response.
            // The error message from the exception is included in the response body.
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
