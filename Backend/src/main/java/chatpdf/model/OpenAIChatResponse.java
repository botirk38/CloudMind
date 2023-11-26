package chatpdf.model;

import java.util.List;

public class OpenAIChatResponse {

    private String id;
    private String object;
    private String created;
    private String model;
    private String system_fingerprint;
    private List<Choice> choices;
    private Usage usage;

    public OpenAIChatResponse(String id, String object, String created, String model, String system_fingerprint, List<Choice> choices, Usage usage) {
        this.id = id;
        this.object = object;
        this.created = created;
        this.model = model;
        this.system_fingerprint = system_fingerprint;
        this.choices = choices;
        this.usage = usage;
    }

    public String getId() {
        return id;
    }

    public String getObject() {
        return object;
    }

    public String getCreated() {
        return created;
    }

    public String getModel() {
        return model;
    }

    public String getSystem_fingerprint() {
        return system_fingerprint;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public Usage getUsage() {
        return usage;
    }





    public static class Choice {
        private int index;
        private Message message;
        private String finish_reason;

        public Choice(int index, Message message, String finish_reason) {
            this.index = index;
            this.message = message;
            this.finish_reason = finish_reason;
        }

        public int getIndex() {
            return index;
        }

        public Message getMessage() {
            return message;
        }

        public String getFinish_reason() {
            return finish_reason;
        }

    }


    public static class Usage{
        private int promptTokens;
        private int completionTokens;
        private int totalTokens;

        public Usage(int promptTokens, int completionTokens, int totalTokens) {
            this.promptTokens = promptTokens;
            this.completionTokens = completionTokens;
            this.totalTokens = totalTokens;
        }

        public int getPromptTokens() {
            return promptTokens;
        }

        public int getCompletionTokens() {
            return completionTokens;
        }

        public int getTotalTokens() {
            return totalTokens;
        }
    }
    

}
