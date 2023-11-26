

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.client.RestTemplate;

import chatpdf.OpenAiController;
import chatpdf.model.FileUploadResponse;
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
            new RetrieveFileContentResponse(expectedContent), HttpStatus.OK
        );
    
        when(restTemplate.exchange(
                eq(apiFilesUrl + "/" + fileId + "/content"),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                ArgumentMatchers.<Class<RetrieveFileContentResponse>>any()
        )).thenReturn(mockResponse);
    
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
    

    
}
