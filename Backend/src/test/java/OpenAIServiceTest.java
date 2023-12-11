
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.containsString;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import chatpdf.OpenAiController;
import chatpdf.model.FileUploadResponse;
import chatpdf.model.Message;
import chatpdf.model.OpenAIChatRequest;
import chatpdf.model.OpenAIChatResponse;
import chatpdf.model.RetrieveFileContentResponse;
import chatpdf.service.OpenAIService;

@SpringBootTest(classes = { OpenAiController.class, OpenAIService.class })
@AutoConfigureMockMvc
public class OpenAIServiceTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private RestTemplate restTemplate;

        @Value("${openai.apiFiles.url}")
        private String apiFilesUrl;

        @Value("${openai.apiChat.url}")
        private String apiChatUrl;

        private MockMultipartFile createMockFile(String fileName, String contentType, byte[] content) {
                return new MockMultipartFile("file", fileName, contentType, content);
        }

        @Test
        public void testValidPdfUpload() throws Exception {
                Path path = Paths.get("src/test/resources/test.pdf");
                byte[] pdfContent = Files.readAllBytes(path);
                MockMultipartFile file = createMockFile("test.pdf", "application/pdf", pdfContent);
                ResponseEntity<String> mockResponse = new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
                when(restTemplate.exchange(any(), any(), any(), ArgumentMatchers.<Class<String>>any()))
                                .thenReturn(mockResponse);

                mockMvc.perform(MockMvcRequestBuilders.multipart("/upload")
                                .file(file)
                                .param("purpose", "assistants"))
                                .andDo(MockMvcResultHandlers.print())
                                .andExpect(MockMvcResultMatchers.status().isOk());

                verify(restTemplate).exchange(
                                eq(apiFilesUrl),
                                eq(HttpMethod.POST),
                                any(HttpEntity.class),
                                eq(FileUploadResponse.class));
        }

        @Test
        public void testValidPdfContentRetrieval() throws Exception {
                String fileId = "file-abc123";
                String expectedContent = "Expected file content";
                ResponseEntity<RetrieveFileContentResponse> mockResponse = new ResponseEntity<>(
                                new RetrieveFileContentResponse(expectedContent), HttpStatus.OK);

                when(restTemplate.exchange(
                                eq(apiFilesUrl + "/" + fileId + "/content"),
                                eq(HttpMethod.GET),
                                any(HttpEntity.class),
                                ArgumentMatchers.<Class<RetrieveFileContentResponse>>any())).thenReturn(mockResponse);

                mockMvc.perform(MockMvcRequestBuilders.get("/retrieveContent")
                                .param("fileId", fileId))
                                .andDo(MockMvcResultHandlers.print())
                                .andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.content().string(expectedContent));

                verify(restTemplate).exchange(
                                eq(apiFilesUrl + "/" + fileId + "/content"),
                                eq(HttpMethod.GET),
                                any(HttpEntity.class),
                                eq(RetrieveFileContentResponse.class));
        }

        @Test
        public void testGetResponse() throws Exception {
                // Arrange
                String fileContent = "Hello!";
                String model = "gpt-3.5-turbo";
                List<Message> messages = new ArrayList<>();
                messages.add(new Message("system", "You are a helpful assistant."));
                messages.add(new Message("user", fileContent));

                OpenAIChatResponse.Choice choice = new OpenAIChatResponse.Choice(
                                0,
                                new Message("assistant", "Hello there, how may I assist you today?"),
                                "stop");
                List<OpenAIChatResponse.Choice> choices = List.of(choice);
                OpenAIChatResponse mockChatResponse = new OpenAIChatResponse(
                                "chatcmpl-123", "chat.completion", "1677652288", "gpt-3.5-turbo-0613",
                                "fp_44709d6fcb", choices, new OpenAIChatResponse.Usage(9, 12, 21));

                ResponseEntity<OpenAIChatResponse> mockResponse = new ResponseEntity<>(mockChatResponse, HttpStatus.OK);

                when(restTemplate.exchange(
                                eq(apiChatUrl),
                                eq(HttpMethod.POST),
                                any(HttpEntity.class),
                                eq(OpenAIChatResponse.class))).thenReturn(mockResponse);

                OpenAIChatRequest chatRequest = new OpenAIChatRequest(messages, model);
                String requestBody = new ObjectMapper().writeValueAsString(chatRequest);

                // Act and Assert
                mockMvc.perform(MockMvcRequestBuilders.post("/chatCompletions")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody))
                                .andDo(MockMvcResultHandlers.print())
                                .andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.content()
                                                .string(containsString("Hello there, how may I assist you today?")));

                // Verify
                verify(restTemplate, times(1)).exchange(
                                eq(apiChatUrl),
                                eq(HttpMethod.POST),
                                any(HttpEntity.class),
                                eq(OpenAIChatResponse.class));
        }

}