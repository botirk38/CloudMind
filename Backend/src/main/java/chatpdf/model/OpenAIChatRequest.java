package chatpdf.model;

import java.util.List;

public class OpenAIChatRequest {

    private List<Message> messages;
    private String model;

    public OpenAIChatRequest(List<Message> messages, String model) {
        this.messages = messages;
        this.model = model;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public String getModel() {
        return model;
    }






    
}
