//// Define the package for this class
package chatpdf.service;

// Import necessary classes from the okhttp3, org.json, and org.springframework libraries
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;

// Annotate this class as a Service to indicate it's a Spring component providing business functionalities
@Service
public class OpenAIService {

    // OkHttpClient instance for sending HTTP requests; it's final as it doesn't need to change
    private final OkHttpClient httpClient = new OkHttpClient();
    private String key = "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";

    // Method to call the OpenAI API, taking a prompt as input and returning a String
    public String callOpenAI(String prompt) throws IOException {
        // Create a new JSONObject to construct the request payload
        JSONObject data = new JSONObject();
        // Add the 'prompt' key with the user-provided prompt as the value
        data.put("prompt", prompt);
        // Add the 'max_tokens' key to limit the response length; here set to 150 tokens
        data.put("max_tokens", 150);

        // Create the request body with the JSON data and specify the content type as JSON
        RequestBody body = RequestBody.create(data.toString(), okhttp3.MediaType.get("application/json; charset=utf-8"));

        // Build the HTTP request to the OpenAI API
        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/engines/davinci/completions") // Set the target URL
                .header("Authorization", "Bearer " + key) // Add the authorization header using the API key from environment variables
                .post(body) // Specify that this is a POST request and attach the request body
                .build();

        // Execute the HTTP request and process the response
        try (Response response = httpClient.newCall(request).execute()) {
            // Return the response body as a string
            return response.body().string();
        }
    }
}
