package chatpdf;

import org.junit.jupiter.api.Test;
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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.client.RestTemplate;
import org.mockito.ArgumentMatchers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootTest(classes={OpenAiController.class, OpenAiService.class})
@AutoConfigureMockMvc
public class OpenAiServiceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestTemplate restTemplate;

    @Value ("${openai.apiFiles.url}")
    private String apiFilesUrl;

    private MockMultipartFile createMockFile(String fileName, String contentType, byte[] content) {
    return new MockMultipartFile("file", fileName, contentType, content);
}

    @Test
    public void testValidPdfUpload() throws Exception {
        Path path = Paths.get("src/test/resources/test.pdf");
        byte[] pdfContent= Files.readAllBytes(path);
        MockMultipartFile file = createMockFile("test.pdf", "application/pdf", pdfContent);
        ResponseEntity<String> mockResponse = new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
        when(restTemplate.exchange(any(), any(), any(), ArgumentMatchers.<Class<String>>any()))
            .thenReturn(mockResponse);

        mockMvc.perform(MockMvcRequestBuilders.multipart("/upload")
                .file(file)
                .param("purpose", "assistants")
                )

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("File uploaded successfully"));

        verify(restTemplate).exchange(
            eq(apiFilesUrl),
            eq(HttpMethod.POST),
            any(HttpEntity.class),
            eq(String.class));
    }

    @Test
    public void testInvalidFileUpload() throws Exception {
        // Setup for invalid file (e.g., unsupported format)
        MockMultipartFile file = createMockFile("test.txt", "text/plain", "Sample Content".getBytes());
        ResponseEntity<String> mockErrorResponse = new ResponseEntity<>("Unsupported file format", HttpStatus.BAD_REQUEST);
        when(restTemplate.exchange(any(), any(), any(), ArgumentMatchers.<Class<String>>any()))
            .thenReturn(mockErrorResponse);

        // Execute and Verify
        mockMvc.perform(MockMvcRequestBuilders.multipart("/upload")
                .file(file)
                .param("purpose", "assistants"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.content().string("Unsupported file format"));
    }

}
