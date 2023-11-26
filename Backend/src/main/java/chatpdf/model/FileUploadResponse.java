package chatpdf.model;

public class FileUploadResponse {
    private String fileId;
    
    public FileUploadResponse(String fileId) {
        this.fileId = fileId;
    }

    public String getFileId() {
        return fileId;
    }

}