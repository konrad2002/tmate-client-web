export abstract class BaseService {
    private readonly serviceName: string;

    protected constructor(serviceName: string) {
        this.serviceName = serviceName;
    }

    log(msg: string, type: "info" | "warning" | "error" | "success" = "info") {
        console.log("[" + type.toUpperCase() +  " | " + this.serviceName +  "]: > " + msg);
    }
}
