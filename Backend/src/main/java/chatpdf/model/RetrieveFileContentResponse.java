package chatpdf.model;

public class RetrieveFileContentResponse {

    private String fileContent;

    public RetrieveFileContentResponse(String fileContent) {
        this.fileContent = fileContent;
    }

    public String getFileContent(){
        return fileContent;
    }
    
}
