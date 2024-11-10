/**
 * nekocord, a Discord client mod
 * Copyright (C) 2024 nekohaxx and contributors
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const { ChannelStore, EmojiStore, PermissionStore, UploadHandler, UserStore } = require("WebpackModules");


const fakeNitroEmojiRegex = /\/emojis\/(\d+?)\.(png|webp|gif)/;
const fakeNitroStickerRegex = /\/stickers\/(\d+?)\./;
const fakeNitroGifStickerRegex = /\/attachments\/\d+?\/\d+?\/(\d+?)\.gif/;
const hyperLinkRegex = /\[.+?\]\((https?:\/\/.+?)\)/;

class FakeNitro {
    info = {
        name: "FakeNitro",
        id: "nekohaxx:fakenitro",
        authors: [{ name: "nekohaxx", id: "1176270221628153886" }],
        description: "Allows you to stream in nitro quality, send fake emojis/stickers, use client themes and custom Discord notifications.",
        version: "0.1.0",
        preferences: [
            {
                name: "Enable Emoji Bypass",
                id: "enableEmojiBypass",
                description: "Allows sending fake emojis (also bypasses missing permission to use custom emojis)",
                type: PreferenceType.BOOLEAN,
                default: true,
                restartNeeded: true
            },
            {
                name: "Emoji Size",
                id: "emojiSize",
                description: "Size of the emojis when sending",
                type: PreferenceType.SLIDER,
                default: 48,
                markers: [32, 48, 64, 128, 160, 256, 512]
            },
            {
                name: "Transform Emojis",
                id: "transformEmojis",
                description: "Whether to transform fake emojis into real ones",
                type: PreferenceType.BOOLEAN,
                default: true,
                restartNeeded: true
            },
            {
                name: "Enable Sticker Bypass",
                id: "enableStickerBypass",
                description: "Allows sending fake stickers (also bypasses missing permission to use stickers)",
                type: PreferenceType.BOOLEAN,
                default: true,
                restartNeeded: true
            },
            {
                name: "Sticker Size",
                id: "stickerSize",
                description: "Size of the stickers when sending",
                type: PreferenceType.SLIDER,
                default: 160,
                markers: [32, 64, 128, 160, 256, 512]
            },
            {
                name: "Transform Stickers",
                id: "transformStickers",
                description: "Whether to transform fake stickers into real ones",
                type: PreferenceType.BOOLEAN,
                default: true,
                restartNeeded: true
            },
            {
                name: "Transform Compound Sentence",
                id: "transformCompoundSentence",
                description: "Whether to transform fake stickers and emojis in compound sentences (sentences with more content than just the fake emoji or sticker link)",
                type: PreferenceType.BOOLEAN,
                default: false
            },
            {
                name: "Enable Stream Quality Bypass",
                id: "enableStreamQualityBypass",
                description: "Allow streaming in nitro quality",
                type: PreferenceType.BOOLEAN,
                default: true,
                restartNeeded: true
            },
            {
                name: "Use HyperLinks",
                id: "useHyperLinks",
                description: "Whether to use hyperlinks when sending fake emojis and stickers",
                type: PreferenceType.BOOLEAN,
                default: true
            },
            {
                name: "HyperLink Text",
                id: "hyperLinkText",
                description: "What text the hyperlink should use. {{NAME}} will be replaced with the emoji/sticker name.",
                type: PreferenceType.STRING,
                default: "{{NAME}}"
            },
            {
                name: "Disable Embed Permission Check",
                id: "disableEmbedPermissionCheck",
                description: "Whether to disable the embed permission check when sending fake emojis and stickers",
                type: PreferenceType.BOOLEAN,
                default: false
            }
        ],
        patches: [
            {
                find: ".PREMIUM_LOCKED;",
                group: true,
                predicate: () => this.userPreferences.enableEmojiBypass,
                replacement: [
                    {
                        match: /(?<=\.USE_EXTERNAL_EMOJIS.+?;)(?<=intention:(\i).+?)/,
                        replace: (_, intention) => `const fakeNitroIntention=${intention};`
                    },
                    {
                        match: /&&!\i&&!\i(?=\)return \i\.\i\.DISALLOW_EXTERNAL;)/,
                        replace: m => `${m}&&!${this.IS_BYPASSEABLE_INTENTION}`
                    },
                    {
                        match: /!\i\.available(?=\)return \i\.\i\.GUILD_SUBSCRIPTION_UNAVAILABLE;)/,
                        replace: m => `${m}&&!${this.IS_BYPASSEABLE_INTENTION}`
                    },
                    {
                        match: /!\i\.\i\.canUseEmojisEverywhere\(\i\)/,
                        replace: m => `(${m}&&!${this.IS_BYPASSEABLE_INTENTION})`
                    },
                    {
                        match: /(?<=\|\|)\i\.\i\.canUseAnimatedEmojis\(\i\)/,
                        replace: m => `(${m}||${this.IS_BYPASSEABLE_INTENTION})`
                    }
                ]
            },
            {
                find: ".getUserIsAdmin(",
                replacement: {
                    match: /(function \i\(\i,\i)\){(.{0,250}.getUserIsAdmin\(.+?return!1})/,
                    replace: (_, rest1, rest2) => `${rest1},fakeNitroOriginal){if(!fakeNitroOriginal)return false;${rest2}`
                }
            },
            {
                find: "canUseCustomStickersEverywhere:function",
                predicate: () => this.userPreferences.enableStickerBypass,
                replacement: {
                    match: /canUseCustomStickersEverywhere:function\(\i\){/,
                    replace: "$&return true;"
                },
            },
            {
                find: '"SENDABLE"',
                predicate: () => this.userPreferences.enableStickerBypass,
                replacement: {
                    match: /\i\.available\?/,
                    replace: "true?"
                }
            },
            {
                find: "canUseHighVideoUploadQuality:function",
                predicate: () => this.userPreferences.enableStreamQualityBypass,
                replacement: [
                    "canUseHighVideoUploadQuality",
                    "canStreamQuality",
                ].map(func => {
                    return {
                        match: new RegExp(`${func}:function\\(\\i(?:,\\i)?\\){`, "g"),
                        replace: "$&return true;"
                    };
                })
            },
            {
                find: "STREAM_FPS_OPTION.format",
                predicate: () => this.userPreferences.enableStreamQualityBypass,
                replacement: {
                    match: /guildPremiumTier:\i\.\i\.TIER_\d,?/g,
                    replace: ""
                }
            },
            {
                find: "canUseClientThemes:function",
                replacement: {
                    match: /canUseClientThemes:function\(\i\){/,
                    replace: "$&return true;"
                }
            },
            {
                find: '"UserSettingsProtoStore"',
                replacement: [
                    {
                        match: /CONNECTION_OPEN:function\((\i)\){/,
                        replace: (m, props) => `${m}$self.handleProtoChange(${props}.userSettingsProto,${props}.user);`
                    },
                    {
                        match: /let{settings:/,
                        replace: "arguments[0].local||$self.handleProtoChange(arguments[0].settings.proto);$&"
                    }
                ]
            },
            {
                find: ",updateTheme(",
                replacement: {
                    match: /(function \i\(\i\){let{backgroundGradientPresetId:(\i).+?)(\i\.\i\.updateAsync.+?theme=(.+?),.+?},\i\))/,
                    replace: (_, rest, backgroundGradientPresetId, originalCall, theme) => `${rest}$self.handleGradientThemeSelect(${backgroundGradientPresetId},${theme},()=>${originalCall});`
                }
            },
            {
                find: '["strong","em","u","text","inlineCode","s","spoiler"]',
                replacement: [
                    {
                        predicate: () => this.userPreferences.transformEmojis,
                        match: /1!==(\i)\.length\|\|1!==\i\.length/,
                        replace: (m, content) => `${m}||$self.shouldKeepEmojiLink(${content}[0])`
                    },
                    {
                        predicate: () => this.userPreferences.transformEmojis || this.userPreferences.transformStickers,
                        match: /(?=return{hasSpoilerEmbeds:\i,content:(\i)})/,
                        replace: (_, content) => `${content}=$self.patchFakeNitroEmojisOrRemoveStickersLinks(${content},arguments[2]?.formatInline);`
                    }
                ]
            },
            {
                find: "}renderEmbeds(",
                replacement: [
                    {
                        predicate: () => this.userPreferences.transformEmojis || this.userPreferences.transformStickers,
                        match: /(renderEmbeds\((\i)\){)(.+?embeds\.map\(\((\i),\i\)?=>{)/,
                        replace: (_, rest1, message, rest2, embed) => `${rest1}const fakeNitroMessage=${message};${rest2}if($self.shouldIgnoreEmbed(${embed},fakeNitroMessage))return null;`
                    },
                    {
                        predicate: () => this.userPreferences.transformStickers,
                        match: /renderStickersAccessories\((\i)\){let (\i)=\(0,\i\.\i\)\(\i\).+?;/,
                        replace: (m, message, stickers) => `${m}${stickers}=$self.patchFakeNitroStickers(${stickers},${message});`
                    },
                    {
                        predicate: () => this.userPreferences.transformStickers,
                        match: /renderAttachments\(\i\){let{attachments:(\i).+?;/,
                        replace: (m, attachments) => `${m}${attachments}=$self.filterAttachments(${attachments});`
                    }
                ]
            },
            {
                find: ".Messages.STICKER_POPOUT_UNJOINED_PRIVATE_GUILD_DESCRIPTION.format",
                predicate: () => this.userPreferences.transformStickers,
                replacement: [
                    {
                        match: /let{renderableSticker:(\i).{0,270}sticker:\i,channel:\i,/,
                        replace: (m, renderableSticker) => `${m}fakeNitroRenderableSticker:${renderableSticker},`
                    },
                    {
                        match: /(let \i,{sticker:\i,channel:\i,closePopout:\i.+?}=(\i).+?;)(.+?description:)(\i)(?=,sticker:\i)/,
                        replace: (_, rest, props, rest2, reactNode) => `${rest}let{fakeNitroRenderableSticker}=${props};${rest2}$self.addFakeNotice(${this.FakeNoticeType.Sticker},${reactNode},!!fakeNitroRenderableSticker?.fake)`
                    }
                ]
            },
            {
                find: ".EMOJI_UPSELL_POPOUT_MORE_EMOJIS_OPENED,",
                predicate: () => this.userPreferences.transformEmojis,
                replacement: {
                    match: /isDiscoverable:\i,shouldHideRoleSubscriptionCTA:\i,(?<={node:(\i),.+?)/,
                    replace: (m, node) => `${m}fakeNitroNode:${node},`
                }
            },
            {
                find: ".Messages.EMOJI_POPOUT_UNJOINED_DISCOVERABLE_GUILD_DESCRIPTION",
                predicate: () => this.userPreferences.transformEmojis,
                replacement: {
                    match: /(?<=emojiDescription:)(\i)(?<=\1=\i\((\i)\).+?)/,
                    replace: (_, reactNode, props) => `$self.addFakeNotice(${this.FakeNoticeType.Emoji},${reactNode},!!${props}?.fakeNitroNode?.fake)`
                }
            },
            {
                find: "canUsePremiumAppIcons:function",
                replacement: {
                    match: /canUsePremiumAppIcons:function\(\i\){/,
                    replace: "$&return true;"
                }
            },
            {
                find: /\.getCurrentDesktopIcon.{0,25}\.isPremium/,
                replacement: {
                    match: /\i\.\i\.isPremium\(\i\.\i\.getCurrentUser\(\)\)/,
                    replace: "true"
                }
            },
            {
                find: 'type:"GUILD_SOUNDBOARD_SOUND_CREATE"',
                replacement: {
                    match: /(?<=type:"(?:SOUNDBOARD_SOUNDS_RECEIVED|GUILD_SOUNDBOARD_SOUND_CREATE|GUILD_SOUNDBOARD_SOUND_UPDATE|GUILD_SOUNDBOARD_SOUNDS_UPDATE)".+?available:)\i\.available/g,
                    replace: "true"
                }
            },
            {
                find: "canUseCustomNotificationSounds:function",
                replacement: {
                    match: /canUseCustomNotificationSounds:function\(\i\){/,
                    replace: "$&return true;"
                }
            }
        ]
    };

    constructor(nekocord) {
        this.nekocord = nekocord;
    }

    onRegister(userPreferences) {
        this.userPreferences = userPreferences;
    }

    onEnable() {
      // Add your enable logic here
  }
  
  onDisable() {
      // Add your disable logic here
  }
  
  handleProtoChange(proto, user) {
      try {
          if (proto == null || typeof proto === "string") return;
  
          const premiumType = user?.premium_type ?? UserStore?.getCurrentUser()?.premiumType ?? 0;
  
          if (premiumType !== 2) {
              proto.appearance ??= AppearanceSettingsActionCreators.create();
  
              if (UserSettingsProtoStore.settings.appearance?.theme != null) {
                  const appearanceSettingsDummy = AppearanceSettingsActionCreators.create({
                      theme: UserSettingsProtoStore.settings.appearance.theme
                  });
  
                  proto.appearance.theme = appearanceSettingsDummy.theme;
              }
  
              if (UserSettingsProtoStore.settings.appearance?.clientThemeSettings?.backgroundGradientPresetId?.value != null) {
                  const clientThemeSettingsDummy = ClientThemeSettingsActionsCreators.create({
                      backgroundGradientPresetId: {
                          value: UserSettingsProtoStore.settings.appearance.clientThemeSettings.backgroundGradientPresetId.value
                      }
                  });
  
                  proto.appearance.clientThemeSettings ??= clientThemeSettingsDummy;
                  proto.appearance.clientThemeSettings.backgroundGradientPresetId = clientThemeSettingsDummy.backgroundGradientPresetId;
              }
          }
      } catch (err) {
          new Logger("FakeNitro").error(err);
      }
  }
  
  handleGradientThemeSelect(backgroundGradientPresetId, theme, original) {
      const premiumType = UserStore?.getCurrentUser()?.premiumType ?? 0;
      if (premiumType === 2 || backgroundGradientPresetId == null) return original();
  
      if (!PreloadedUserSettingsActionCreators || !AppearanceSettingsActionCreators || !ClientThemeSettingsActionsCreators || !BINARY_READ_OPTIONS) return;
  
      const currentAppearanceSettings = PreloadedUserSettingsActionCreators.getCurrentValue().appearance;
  
      const newAppearanceProto = currentAppearanceSettings != null
          ? AppearanceSettingsActionCreators.fromBinary(AppearanceSettingsActionCreators.toBinary(currentAppearanceSettings), BINARY_READ_OPTIONS)
          : AppearanceSettingsActionCreators.create();
  
      newAppearanceProto.theme = theme;
  
      const clientThemeSettingsDummy = ClientThemeSettingsActionsCreators.create({
          backgroundGradientPresetId: {
              value: backgroundGradientPresetId
          }
      });
  
      newAppearanceProto.clientThemeSettings ??= clientThemeSettingsDummy;
      newAppearanceProto.clientThemeSettings.backgroundGradientPresetId = clientThemeSettingsDummy.backgroundGradientPresetId;
  
      const proto = PreloadedUserSettingsActionCreators.ProtoClass.create();
      proto.appearance = newAppearanceProto;
  
      FluxDispatcher.dispatch({
          type: "USER_SETTINGS_PROTO_UPDATE",
          local: true,
          partial: true,
          settings: {
              type: 1,
              proto
          }
      });
  }
  
  patchFakeNitroEmojisOrRemoveStickersLinks(content, inline) {
      // If content has more than one child or it's a single ReactElement like a header, list or span
      if ((content.length > 1 || typeof content[0]?.type === "string") && !this.userPreferences.transformCompoundSentence) return content;
  
      let nextIndex = content.length;
  
      const transformLinkChild = (child) => {
          if (this.userPreferences.transformEmojis) {
              const fakeNitroMatch = child.props.href.match(fakeNitroEmojiRegex);
              if (fakeNitroMatch) {
                  let url = null;
                  try {
                      url = new URL(child.props.href);
                  } catch { }
  
                  const emojiName = EmojiStore.getCustomEmojiById(fakeNitroMatch[1])?.name ?? url?.searchParams.get("name") ?? "FakeNitroEmoji";
  
                  return Parser.defaultRules.customEmoji.react({
                      jumboable: !inline && content.length === 1 && typeof content[0].type !== "string",
                      animated: fakeNitroMatch[2] === "gif",
                      emojiId: fakeNitroMatch[1],
                      name: emojiName,
                      fake: true
                  }, void 0, { key: String(nextIndex++) });
              }
          }
  
          if (this.userPreferences.transformStickers) {
              if (fakeNitroStickerRegex.test(child.props.href)) return null;
  
              const gifMatch = child.props.href.match(fakeNitroGifStickerRegex);
              if (gifMatch) {
                  // There is no way to differentiate a regular gif attachment from a fake nitro animated sticker, so we check if the StickerStore contains the id of the fake sticker
                  if (StickerStore.getStickerById(gifMatch[1])) return null;
              }
          }
  
          return child;
      };
  
      const transformChild = (child) => {
          if (child?.props?.trusted != null) return transformLinkChild(child);
          if (child?.props?.children != null) {
              if (!Array.isArray(child.props.children)) {
                  child.props.children = modifyChild(child.props.children);
                  return child;
              }
  
              child.props.children = modifyChildren(child.props.children);
              if (child.props.children.length === 0) return null;
              return child;
          }
  
          return child;
      };
  
      const modifyChild = (child) => {
          const newChild = transformChild(child);
  
          if (newChild?.type === "ul" || newChild?.type === "ol") {
              this.ensureChildrenIsArray(newChild);
              if (newChild.props.children.length === 0) return null;
  
              let listHasAnItem = false;
              for (const [index, child] of newChild.props.children.entries()) {
                  if (child == null) {
                      delete newChild.props.children[index];
                      continue;
                  }
  
                  this.ensureChildrenIsArray(child);
                  if (child.props.children.length > 0) listHasAnItem = true;
                  else delete newChild.props.children[index];
              }
  
              if (!listHasAnItem) return null;
  
              newChild.props.children = this.clearEmptyArrayItems(newChild.props.children);
          }
  
          return newChild;
      };
  
      const modifyChildren = (children) => {
          for (const [index, child] of children.entries()) children[index] = modifyChild(child);
  
          children = this.clearEmptyArrayItems(children);
  
          return children;
      };
  
      try {
          const newContent = modifyChildren(lodash.cloneDeep(content));
          this.trimContent(newContent);
  
          return newContent;
      } catch (err) {
          new Logger("FakeNitro").error(err);
          return content;
      }
  }
  
  patchFakeNitroStickers(stickers, message) {
      const itemsToMaybePush = [];
  
      const contentItems = message.content.split(/\s/);
      if (this.userPreferences.transformCompoundSentence) itemsToMaybePush.push(...contentItems);
      else if (contentItems.length === 1) itemsToMaybePush.push(contentItems[0]);
  
      itemsToMaybePush.push(...message.attachments.filter(attachment => attachment.content_type === "image/gif").map(attachment => attachment.url));
  
      for (const item of itemsToMaybePush) {
          if (!this.userPreferences.transformCompoundSentence && !item.startsWith("http") && !hyperLinkRegex.test(item)) continue;
  
          const imgMatch = item.match(fakeNitroStickerRegex);
          if (imgMatch) {
              let url = null;
              try {
                  url = new URL(item);
              } catch { }
  
              const stickerName = StickerStore.getStickerById(imgMatch[1])?.name ?? url?.searchParams.get("name") ?? "FakeNitroSticker";
              stickers.push({
                  format_type: 1,
                  id: imgMatch[1],
                  name: stickerName,
                  fake: true
              });
  
              continue;
          }
  
          const gifMatch = item.match(fakeNitroGifStickerRegex);
          if (gifMatch) {
              if (!StickerStore.getStickerById(gifMatch[1])) continue;
  
              const stickerName = StickerStore.getStickerById(gifMatch[1])?.name ?? "FakeNitroSticker";
              stickers.push({
                  format_type: 2,
                  id: gifMatch[1],
                  name: stickerName,
                  fake: true
              });
          }
      }
  
      return stickers;
  }
  
  shouldIgnoreEmbed(embed, message) {
      const contentItems = message.content.split(/\s/);
      if (contentItems.length > 1 && !this.userPreferences.transformCompoundSentence) return false;
  
      switch (embed.type) {
          case "image": {
              if (
                  !this.userPreferences.transformCompoundSentence
                  && !contentItems.some(item => item === embed.url || item.match(hyperLinkRegex)?.[1] === embed.url)
              ) return false;
  
              if (this.userPreferences.transformEmojis) {
                  if (fakeNitroEmojiRegex.test(embed.url)) return true;
              }
  
              if (this.userPreferences.transformStickers) {
                  if (fakeNitroStickerRegex.test(embed.url)) return true;
  
                  const gifMatch = embed.url.match(fakeNitroGifStickerRegex);
                  if (gifMatch) {
                      // There is no way to differentiate a regular gif attachment from a fake nitro animated sticker, so we check if the StickerStore contains the id of the fake sticker
                      if (StickerStore.getStickerById(gifMatch[1])) return true;
                  }
              }
  
              break;
          }
      }
  
      return false;
  }
  
  filterAttachments(attachments) {
      return attachments.filter(attachment => {
          if (attachment.content_type !== "image/gif") return true;
  
          const match = attachment.url.match(fakeNitroGifStickerRegex);
          if (match) {
              // There is no way to differentiate a regular gif attachment from a fake nitro animated sticker, so we check if the StickerStore contains the id of the fake sticker
              if (StickerStore.getStickerById(match[1])) return false;
          }
  
          return true;
      });
  }
  
  shouldKeepEmojiLink(link) {
      return link.target && fakeNitroEmojiRegex.test(link.target);
  }
  
  addFakeNotice(type, node, fake) {
      if (!fake) return node;
  
      node = Array.isArray(node) ? node : [node];
  
      switch (type) {
          case FakeNoticeType.Sticker: {
              node.push(" This is a FakeNitro sticker and renders like a real sticker only for you. Appears as a link to non-plugin users.");
  
              return node;
          }
          case FakeNoticeType.Emoji: {
              node.push(" This is a FakeNitro emoji and renders like a real emoji only for you. Appears as a link to non-plugin users.");
  
              return node;
          }
      }
  }
  
  getStickerLink(stickerId) {
      return `https://media.discordapp.net/stickers/${stickerId}.png?size=${this.userPreferences.stickerSize}`;
  }
  
  async sendAnimatedSticker(stickerLink, stickerId, channelId) {
      const { parseURL } = importApngJs();
  
      const { frames, width, height } = await parseURL(stickerLink);
  
      const gif = GIFEncoder();
      const resolution = this.userPreferences.stickerSize;
  
      const canvas = document.createElement("canvas");
      canvas.width = resolution;
      canvas.height = resolution;
  
      const ctx = canvas.getContext("2d", {
          willReadFrequently: true
      });
  
      const scale = resolution / Math.max(width, height);
      ctx.scale(scale, scale);
  
      let previousFrameData;
  
      for (const frame of frames) {
          const { left, top, width, height, img, delay, blendOp, disposeOp } = frame;
  
          previousFrameData = ctx.getImageData(left, top, width, height);
  
          if (blendOp === ApngBlendOp.SOURCE) {
              ctx.clearRect(left, top, width, height);
          }
  
          ctx.drawImage(img, left, top, width, height);
  
          const { data } = ctx.getImageData(0, 0, resolution, resolution);
  
          const palette = quantize(data, 256);
          const index = applyPalette(data, palette);
  
          gif.writeFrame(index, resolution, resolution, {
              transparent: true,
              palette,
              delay
          });
  
          if (disposeOp === ApngDisposeOp.BACKGROUND) {
              ctx.clearRect(left, top, width, height);
          } else if (disposeOp === ApngDisposeOp.PREVIOUS) {
              ctx.putImageData(previousFrameData, left, top);
          }
      }
  
      gif.finish();
  
      const file = new File([gif.bytesView()], `${stickerId}.gif`, { type: "image/gif" });
      UploadHandler.promptToUpload([file], ChannelStore.getChannel(channelId), DraftType.ChannelMessage);
  }
  
  canUseEmote(e, channelId) {
      if (e.type === 0) return true;
      if (e.available === false) return false;
  
      if (isUnusableRoleSubscriptionEmoji(e, this.guildId, true)) return false;
  
      if (this.canUseEmotes)
          return e.guildId === this.guildId || hasExternalEmojiPerms(channelId);
      else
          return !e.animated && e.guildId === this.guildId;
  }
  
  start() {
      const s = this.userPreferences;
  
      if (!s.enableEmojiBypass && !s.enableStickerBypass) {
          return;
      }
  
      function getWordBoundary(origStr, offset) {
          return (!origStr[offset] || /\s/.test(origStr[offset])) ? "" : " ";
      }
  
      function cannotEmbedNotice() {
          return new Promise(resolve => {
              Alerts.show({
                  title: "Hold on!",
                  body: <div>
                      <Forms.FormText>
                          You are trying to send/edit a message that contains a FakeNitro emoji or sticker,
                          however you do not have permissions to embed links in the current channel.
                          Are you sure you want to send this message? Your FakeNitro items will appear as a link only.
                      </Forms.FormText>
                      <Forms.FormText type={Forms.FormText.Types.DESCRIPTION}>
                          You can disable this notice in the plugin settings.
                      </Forms.FormText>
                  </div>,
                  confirmText: "Send Anyway",
                  cancelText: "Cancel",
                  secondaryConfirmText: "Do not show again",
                  onConfirm: () => resolve(true),
                  onCloseCallback: () => setImmediate(() => resolve(false)),
                  onConfirmSecondary() {
                      this.userPreferences.disableEmbedPermissionCheck = true;
                      resolve(true);
                  }
              });
          });
      }
  
      this.preSend = addPreSendListener(async (channelId, messageObj, extra) => {
          const { guildId } = this;
  
          let hasBypass = false;
  
          stickerBypass: {
              if (!s.enableStickerBypass)
                  break stickerBypass;
  
              const sticker = StickerStore.getStickerById(extra.stickers?.[0]);
              if (!sticker)
                  break stickerBypass;
  
              // Discord Stickers are now free yayyy!! :D
              if ("pack_id" in sticker)
                  break stickerBypass;
  
              const canUseStickers = this.canUseStickers && hasExternalStickerPerms(channelId);
              if (sticker.available !== false && (canUseStickers || sticker.guild_id === guildId))
                  break stickerBypass;
  
              // [12/12/2023]
              // Work around an annoying bug where getStickerLink will return StickerType.GIF,
              // but will give us a normal non animated png for no reason
              // TODO: Remove this workaround when it's not needed anymore
              let link = this.getStickerLink(sticker.id);
              if (sticker.format_type === StickerType.GIF && link.includes(".png")) {
                  link = link.replace(".png", ".gif");
              }
  
              if (sticker.format_type === StickerType.APNG) {
                  if (!hasAttachmentPerms(channelId)) {
                      Alerts.show({
                          title: "Hold on!",
                          body: <div>
                              <Forms.FormText>
                                  You cannot send this message because it contains an animated FakeNitro sticker,
                                  and you do not have permissions to attach files in the current channel. Please remove the sticker to proceed.
                              </Forms.FormText>
                          </div>
                      });
                  } else {
                      this.sendAnimatedSticker(link, sticker.id, channelId);
                  }
  
                  return { cancel: true };
              } else {
                  hasBypass = true;
  
                  const url = new URL(link);
                  url.searchParams.set("name", sticker.name);
  
                  const linkText = s.hyperLinkText.replaceAll("{{NAME}}", sticker.name);
  
                  messageObj.content += `${getWordBoundary(messageObj.content, messageObj.content.length - 1)}${s.useHyperLinks ? `[${linkText}](${url})` : url}`;
                  extra.stickers.length = 0;
              }
          }
  
          if (s.enableEmojiBypass) {
              for (const emoji of messageObj.validNonShortcutEmojis) {
                  if (this.canUseEmote(emoji, channelId)) continue;
  
                  hasBypass = true;
  
                  const emojiString = `<${emoji.animated ? "a" : ""}:${emoji.originalName || emoji.name}:${emoji.id}>`;
  
                  const url = new URL(IconUtils.getEmojiURL({ id: emoji.id, animated: emoji.animated, size: s.emojiSize }));
                  url.searchParams.set("size", s.emojiSize.toString());
                  url.searchParams.set("name", emoji.name);
  
                  const linkText = s.hyperLinkText.replaceAll("{{NAME}}", emoji.name);
  
                  messageObj.content = messageObj.content.replace(emojiString, (match, offset, origStr) => {
                      return `${getWordBoundary(origStr, offset - 1)}${s.useHyperLinks ? `[${linkText}](${url})` : url}${getWordBoundary(origStr, offset + match.length)}`;
                  });
              }
          }
  
          if (hasBypass && !s.disableEmbedPermissionCheck && !hasEmbedPerms(channelId)) {
              if (!await cannotEmbedNotice()) {
                  return { cancel: true };
              }
          }
  
          return { cancel: false };
      });
  
      this.preEdit = addPreEditListener(async (channelId, __, messageObj) => {
          if (!s.enableEmojiBypass) return;
  
          let hasBypass = false;
  
          messageObj.content = messageObj.content.replace(/(?<!\\)<a?:(?:\w+):(\d+)>/ig, (emojiStr, emojiId, offset, origStr) => {
              const emoji = EmojiStore.getCustomEmojiById(emojiId);
              if (emoji == null) return emojiStr;
              if (this.canUseEmote(emoji, channelId)) return emojiStr;
  
              hasBypass = true;
  
              const url = new URL(IconUtils.getEmojiURL({ id: emoji.id, animated: emoji.animated, size: s.emojiSize }));
              url.searchParams.set("size", s.emojiSize.toString());
              url.searchParams.set("name", emoji.name);
  
              const linkText = s.hyperLinkText.replaceAll("{{NAME}}", emoji.name);
  
              return `${getWordBoundary(origStr, offset - 1)}${s.useHyperLinks ? `[${linkText}](${url})` : url}${getWordBoundary(origStr, offset + emojiStr.length)}`;
            });
    
            if (hasBypass && !s.disableEmbedPermissionCheck && !hasEmbedPerms(channelId)) {
                if (!await cannotEmbedNotice()) {
                    return { cancel: true };
                }
            }
    
            return { cancel: false };
        });
    }
    
    stop() {
        removePreSendListener(this.preSend);
        removePreEditListener(this.preEdit);
    }
    
    getWordBoundary(origStr, offset) {
        return (!origStr[offset] || /\s/.test(origStr[offset])) ? "" : " ";
    }
    
cannotEmbedNotice() {
    return new Promise(resolve => {
        Alerts.show({
            title: "Hold on!",
            body: React.createElement("div", null,
                React.createElement(Forms.FormText, null, 
                    "You are trying to send/edit a message that contains a FakeNitro emoji or sticker, however you do not have permissions to embed links in the current channel. Are you sure you want to send this message? Your FakeNitro items will appear as a link only."
                ),
                React.createElement(Forms.FormText, { type: Forms.FormText.Types.DESCRIPTION }, 
                    "You can disable this notice in the plugin settings."
                )
            ),
            confirmText: "Send Anyway",
            cancelText: "Cancel",
            secondaryConfirmText: "Do not show again",
            onConfirm: () => resolve(true),
            onCloseCallback: () => setImmediate(() => resolve(false)),
            onConfirmSecondary() {
                settings.store.disableEmbedPermissionCheck = true;
                resolve(true);
            }
        });
    });
}
cannotEmbedNotice() {
  return new Promise(resolve => {
      Alerts.show({
          title: "Hold on!",
          body: React.createElement("div", null,
              React.createElement(Forms.FormText, null, 
                  "You are trying to send/edit a message that contains a FakeNitro emoji or sticker, however you do not have permissions to embed links in the current channel. Are you sure you want to send this message? Your FakeNitro items will appear as a link only."
              ),
              React.createElement(Forms.FormText, { type: Forms.FormText.Types.DESCRIPTION }, 
                  "You can disable this notice in the plugin settings."
              )
          ),
          confirmText: "Send Anyway",
          cancelText: "Cancel",
          secondaryConfirmText: "Do not show again",
          onConfirm: () => resolve(true),
          onCloseCallback: () => setImmediate(() => resolve(false)),
          onConfirmSecondary() {
              settings.store.disableEmbedPermissionCheck = true;
              resolve(true);
          }
      });
  });
}
    
    canUseEmote(e, channelId) {
        if (e.type === 0) return true;
        if (e.available === false) return false;
    
        if (isUnusableRoleSubscriptionEmoji(e, this.guildId, true)) return false;
    
        if (this.canUseEmotes)
            return e.guildId === this.guildId || hasExternalEmojiPerms(channelId);
        else
            return !e.animated && e.guildId === this.guildId;
    }
    
    async sendAnimatedSticker(stickerLink, stickerId, channelId) {
        const { parseURL } = importApngJs();
    
        const { frames, width, height } = await parseURL(stickerLink);
    
        const gif = GIFEncoder();
        const resolution = this.userPreferences.stickerSize;
    
        const canvas = document.createElement("canvas");
        canvas.width = resolution;
        canvas.height = resolution;
    
        const ctx = canvas.getContext("2d", {
            willReadFrequently: true
        });
    
        const scale = resolution / Math.max(width, height);
        ctx.scale(scale, scale);
    
        let previousFrameData;
    
        for (const frame of frames) {
            const { left, top, width, height, img, delay, blendOp, disposeOp } = frame;
    
            previousFrameData = ctx.getImageData(left, top, width, height);
    
            if (blendOp === ApngBlendOp.SOURCE) {
                ctx.clearRect(left, top, width, height);
            }
    
            ctx.drawImage(img, left, top, width, height);
    
            const { data } = ctx.getImageData(0, 0, resolution, resolution);
    
            const palette = quantize(data, 256);
            const index = applyPalette(data, palette);
    
            gif.writeFrame(index, resolution, resolution, {
                transparent: true,
                palette,
                delay
            });
    
            if (disposeOp === ApngDisposeOp.BACKGROUND) {
                ctx.clearRect(left, top, width, height);
            } else if (disposeOp === ApngDisposeOp.PREVIOUS) {
                ctx.putImageData(previousFrameData, left, top);
            }
        }
    
        gif.finish();
    
        const file = new File([gif.bytesView()], `${stickerId}.gif`, { type: "image/gif" });
        UploadHandler.promptToUpload([file], ChannelStore.getChannel(channelId), DraftType.ChannelMessage);
    }

    exports.default = FakeNitro;