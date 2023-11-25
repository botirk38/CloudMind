package chatpdf;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.apiFiles.url}")
    private String apiFilesUrl;

    @Value("${openai.apiChat.url}")
    private String apiChatUrl;

    private static final Logger logger = LoggerFactory.getLogger(OpenAiService.class);


    public ResponseEntity<String> uploadFile(MultipartFile file, String purpose) throws IOException{
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(apiKey);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new InputStreamResource(file.getInputStream()));
        body.add("purpose", purpose);


        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        logger.info("Headers: {}", requestEntity.getHeaders());
        logger.info("Body: {}", requestEntity.getBody());

        return restTemplate.exchange(apiFilesUrl, HttpMethod.POST, requestEntity, String.class);
    }

    
}
