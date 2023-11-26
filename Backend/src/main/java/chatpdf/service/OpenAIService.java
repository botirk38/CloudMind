package chatpdf.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import chatpdf.model.FileUploadResponse;
import chatpdf.model.Message;
import chatpdf.model.OpenAIChatRequest;
import chatpdf.model.OpenAIChatResponse;
import chatpdf.model.RetrieveFileContentResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestClientException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.apiFiles.url}")
    private String apiFilesUrl;

    @Value("${openai.apiChat.url}")
    private String apiChatUrl;

    private final RestTemplate restTemplate;
    private final Logger logger = LoggerFactory.getLogger(OpenAIService.class);
    private final List<Message> messages = new ArrayList<>();


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
        ResponseEntity<FileUploadResponse> response;

        try {
            response = restTemplate.exchange(apiFilesUrl, HttpMethod.POST, requestEntity, FileUploadResponse.class);
            if (response == null) {
                logger.error("Response from the server is null");
                return "Error: No response from server";
            }

            FileUploadResponse fileUploadResponse = response.getBody();
            if (fileUploadResponse == null) {
                logger.error("Response body is null");
                return new Error("Error: Response body is null").toString();
            }
            return fileUploadResponse.getFileId();
        } catch (RestClientException e) {
            logger.error("Error while uploading file: ", e);
            throw new IOException("Error while uploading file: " + e.getMessage(), e);
        }
    }

    public String retrieveFileContent(String fileId) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<RetrieveFileContentResponse> response;

        String fileLocation = apiFilesUrl + "/" + fileId + "/content";

        try{
            response = restTemplate.exchange(fileLocation, HttpMethod.GET, requestEntity, RetrieveFileContentResponse.class);

            if(response == null){
                logger.error("Response from the server is null");
                return new Error("Error: No response from server").toString();
            }

            RetrieveFileContentResponse retrieveFileContentResponse = response.getBody();
            if(retrieveFileContentResponse == null){
                logger.error("Response body is null");
                return new Error("Error: Response body is null").toString();
            }

            return retrieveFileContentResponse.getFileContent();
        }catch(RestClientException e){
            logger.error("Error while retrieving file content: ", e);
            throw new IOException("Error while retrieving file content: " + e.getMessage(), e);
        }
    }

    public String getResponse(String fileContent, String model) throws IOException{
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

       

        OpenAIChatRequest openAIChatRequest = new OpenAIChatRequest(messages, model);

        HttpEntity<OpenAIChatRequest> requestEntity = new HttpEntity<>(openAIChatRequest, headers);
        ResponseEntity<OpenAIChatResponse> response;

        String chatCompletionsUrl = apiChatUrl;

        try{
            response = restTemplate.exchange(chatCompletionsUrl, HttpMethod.POST, requestEntity, OpenAIChatResponse.class);

            if(response == null){
                logger.error("Response from the server is null");
                return new Error("Error: No response from server").toString();
            }

            OpenAIChatResponse openAIChatResponse = response.getBody();

            if(openAIChatResponse == null){
                logger.error("Response body is null");
                return new Error("Error: Response body is null").toString();
            }

            return openAIChatResponse.getChoices().get(0).getMessage().getContent();

        }catch(RestClientException e){
            logger.error("Error while retrieving file content: ", e);
            throw new IOException("Error while retrieving file content: " + e.getMessage(), e);
        }



    }

}
