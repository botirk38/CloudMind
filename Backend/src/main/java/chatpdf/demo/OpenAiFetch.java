package chatpdf.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class OpenAiFetch {

    @Autowired
    private OpenAiService openAiService;

    public static void main(String[] args) {
        SpringApplication.run(OpenAiFetch.class, args);
    }

    @PostConstruct
    public void exampleUsage() {
        CompletionRequest request = CompletionRequest.builder()
                .prompt("TOP 5 richest countries") // "What is the meaning of life?"'")
                .model("text-davinci-002")
                .maxTokens(70)
                .build();

        String result = openAiService.createCompletion(request).getChoices().get(0).getText();
        System.out.println("API Response: " + result);
    }
}
