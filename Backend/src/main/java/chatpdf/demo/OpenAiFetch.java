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
                .prompt("what are top 10  anime based on fan liking'")
                .model("text-davinci-002")
                .maxTokens(60)
                .build();

        String result = openAiService.createCompletion(request).getChoices().get(0).getText();
        System.out.println("API Response: " + result);
    }
}
