package chatpdf.model;

public class FileUploadResponse {
    private String fileId;
    private String object;
    private int bytes;
    private int createdAt;
    private String fileName;
    private String purpose;

    public FileUploadResponse(String fileId, String object, int bytes, int createdAt, String fileName, String purpose) {
        this.fileId = fileId;
        this.object = object;
        this.bytes = bytes;
        this.createdAt = createdAt;
        this.fileName = fileName;
        this.purpose = purpose;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public int getBytes() {
        return bytes;
    }

    public void setBytes(int bytes) {
        this.bytes = bytes;
    }

    public int getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(int createdAt) {
        this.createdAt = createdAt;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
}