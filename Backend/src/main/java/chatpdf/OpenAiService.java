package chatpdf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestClientException;


import java.io.IOException;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.apiFiles.url}")
    private String apiFilesUrl;

    private final RestTemplate restTemplate;
    private final Logger logger = LoggerFactory.getLogger(OpenAIService.class);

    public OpenAIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String uploadFile(MultipartFile file, String purpose) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(apiKey);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new InputStreamResource(file.getInputStream()));
        body.add("purpose", purpose);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response;

        try {
            response = restTemplate.exchange(apiFilesUrl, HttpMethod.POST, requestEntity, String.class);
            if (response == null) {
                logger.error("Response from the server is null");
                return "Error: No response from server";
            }

            return response.getBody();
        } catch (RestClientException e) {
            logger.error("Error while uploading file: ", e);
            throw new IOException("Error while uploading file: " + e.getMessage(), e);
        }
    }
}
