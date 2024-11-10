import { LocaleStore } from "../webpack/WebpackModules";

export const LocalizableStrings = {
    "en-US": {
        PLUGINS: "Plugins",
        THEMES: "Themes",
        REPOSITORIES: "Repositories",
        DIRECTORY: "Directory",
    },
    "tok": {
        PLUGINS: "ilo pali",
        THEMES: "lipu lukin",
        REPOSITORIES: "poki ilo pali",
        DIRECTORY: "lipu lawa",
    },
    "ja": {
        PLUGINS: "プラグイン",
        THEMES: "テーマ",
        REPOSITORIES: "リポジトリ",
        DIRECTORY: "ディレクトリ",
    },
    "zh-CN": {
        PLUGINS: "插件",
        THEMES: "主题",
        REPOSITORIES: "存储库",
        DIRECTORY: "目录",
    }
};

export const Localization = {
    LocalizableStrings,
    localize(key: string) {
        const locale = LocaleStore?.locale || "en-US";
        return LocalizableStrings[locale]?.[key] || LocalizableStrings["en-US"][key];
    },
    Messages: new Proxy({} as Record<string, string>, {
        get(target, prop) {
            return LocalizableStrings[LocaleStore?.locale || "en-US"]?.[prop] || LocalizableStrings["en-US"][prop];
        }
    })
};