package chatpdf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
public class OpenAiController {

    @Autowired
    private OpenAIService openAiService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("purpose") String purpose) {
        try {
            return ResponseEntity.ok(openAiService.uploadFile(file, purpose));
        } catch (IOException e) {
        
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }
}
