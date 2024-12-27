interface APIKeys {
  openai?: string;
  google?: string;
  claude?: string;
}

class ConfigService {
  private static instance: ConfigService;
  private apiKeys: APIKeys = {};

  private constructor() {}

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  public getApiKey(provider: string): string {
    return this.apiKeys[provider as keyof APIKeys] || '';
  }

  public setApiKey(provider: string, key: string): void {
    this.apiKeys[provider as keyof APIKeys] = key;
  }

  public getAllApiKeys(): APIKeys {
    return { ...this.apiKeys };
  }
}

export default ConfigService;
