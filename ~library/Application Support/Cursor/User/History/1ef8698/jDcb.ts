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

import { WebpackInstance } from "discord-types/other";
import { Nekocord } from "../renderer/Nekocord";
import { Logger } from "../api/Logger";
import type * as Stores from "discord-types/stores";

export let React: typeof import("react");
export let useState: typeof React.useState;
export let useEffect: typeof React.useEffect;
export let useMemo: typeof React.useMemo;
export let useRef: typeof React.useRef;
export let useReducer: typeof React.useReducer;
export let useCallback: typeof React.useCallback;

export function findByPropsLazy(...props: string[]) {
    if (IS_REPORTER) lazyWebpackSearchHistory.push(["findByProps", props]);

    return proxyLazy(() => findByProps(...props));
}

export function waitForStore(name: string, cb: (v: any) => void) {
    if (IS_REPORTER) lazyWebpackSearchHistory.push(["waitForStore", [name]]);

    waitFor(filters.byStoreName(name), cb, { isIndirect: true });
}

export let ChannelStore: Stores.ChannelStore & t.FluxStore;

waitForStore("ChannelStore", m => ChannelStore = m);







import type { CSSProperties, ComponentClass, ComponentType, FunctionComponent, HTMLProps, HtmlHTMLAttributes, PropsWithChildren, ReactNode, Ref } from "react";

export enum ChatSidebarType {
    PostSidebar,
    ThreadSidebar,
    CallChatSidebar,
    MessageRequestSidebar,
}
export type FormTextTypes = Record<"DEFAULT" | "INPUT_PLACEHOLDER" | "DESCRIPTION" | "LABEL_BOLD" | "LABEL_SELECTED" | "LABEL_DESCRIPTOR" | "ERROR" | "SUCCESS", string>;
export type HeadingTag = `h${1 | 2 | 3 | 4 | 5 | 6}`;
export const enum ModalSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    DYNAMIC = "dynamic",
}
export type TextVariant = "heading-sm/normal" | "heading-sm/medium" | "heading-sm/semibold" | "heading-sm/bold" | "heading-md/normal" | "heading-md/medium" | "heading-md/semibold" | "heading-md/bold" | "heading-lg/normal" | "heading-lg/medium" | "heading-lg/semibold" | "heading-lg/bold" | "heading-xl/normal" | "heading-xl/medium" | "heading-xl/bold" | "heading-xxl/normal" | "heading-xxl/medium" | "heading-xxl/bold" | "eyebrow" | "heading-deprecated-14/normal" | "heading-deprecated-14/medium" | "heading-deprecated-14/bold" | "text-xxs/normal" | "text-xxs/medium" | "text-xxs/semibold" | "text-xxs/bold" | "text-xs/normal" | "text-xs/medium" | "text-xs/semibold" | "text-xs/bold" | "text-sm/normal" | "text-sm/medium" | "text-sm/semibold" | "text-sm/bold" | "text-md/normal" | "text-md/medium" | "text-md/semibold" | "text-md/bold" | "text-lg/normal" | "text-lg/medium" | "text-lg/semibold" | "text-lg/bold" | "display-sm" | "display-md" | "display-lg" | "code";
export interface Toast {
    message: string;
    id: string;
    type: number;
    options: {
        position: number;
        component?: ReactNode,
        duration: number;
    }
}
export type TooltipPositions = Record<"BOTTOM" | "CENTER" | "LEFT" | "RIGHT" | "TOP" | "WINDOW_CENTER", string>;
export const enum ModalTransitionState {
    ENTERING,
    ENTERED,
    EXITING,
    EXITED,
    HIDDEN, 
}
export interface ModalOptions {
    modalKey?: string;
    onCloseRequest?: (() => void);
    onCloseCallback?: (() => void);
}
export interface ModalProps {
    transitionState: ModalTransitionState;
    onClose(): Promise<void>;
}
export type RenderFunction = (props: ModalProps) => ReactNode;

export let Button: ComponentType<PropsWithChildren<Omit<HTMLProps<HTMLButtonElement>, "size"> & {
    /** Button.Looks.FILLED */
    look?: string;
    /** Button.Colors.BRAND */
    color?: string;
    /** Button.Sizes.MEDIUM */
    size?: string;
    /** Button.BorderColors.BLACK */
    borderColor?: string;

    wrapperClassName?: string;
    className?: string;
    innerClassName?: string;
    
    buttonRef?: Ref<HTMLButtonElement>;
    focusProps?: any;
    submitting?: boolean;
    
    submittingStartedLabel?: string;
    submittingFinishedLabel?: string;
}>> & {
    BorderColors: Record<"BLACK" | "BRAND" | "BRAND_NEW" | "GREEN" | "LINK" | "PRIMARY" | "RED" | "TRANSPARENT" | "WHITE" | "YELLOW", string>;
    Colors: Record<"BRAND" | "RED" | "GREEN" | "YELLOW" | "PRIMARY" | "LINK" | "WHITE" | "BLACK" | "TRANSPARENT" | "BRAND_NEW" | "CUSTOM", string>;
    Hovers: Record<"DEFAULT" | "BRAND" | "RED" | "GREEN" | "YELLOW" | "PRIMARY" | "LINK" | "WHITE" | "BLACK" | "TRANSPARENT", string>;
    Looks: Record<"FILLED" | "INVERTED" | "OUTLINED" | "LINK" | "BLANK", string>;
    Sizes: Record<"NONE" | "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "XLARGE" | "MIN" | "MAX" | "ICON", string>;

    Link: any;
};
export let Card: ComponentType<PropsWithChildren<HTMLProps<HTMLDivElement> & {
    editable?: boolean;
    outline?: boolean;
    /** Card.Types.PRIMARY */ 
    type?: string; 
}>> & {
    Types: Record<"BRAND" | "CUSTOM" | "DANGER" | "PRIMARY" | "SUCCESS" | "WARNING", string>;
};
export let ChannelChatResizableSidebar: ComponentType<PropsWithChildren<{
    sidebarType: ChatSidebarType;
    maxWidth: number;
    onWidthChange?: (newWidth: number, isFloating: boolean) => void;
    floatingLayer?: (props: any) => JSX.Element;
}>>;
export let ConfirmModal: ComponentType<PropsWithChildren<{
    className?: string;
    bodyClassName?: string;
    header?: ReactNode; // TODO: check type
    confirmText?: string;
    cancelText?: string;
    onConfirm?(): void;
    confirmButtonColor?: typeof Button.Colors[keyof typeof Button.Colors];
}>>;
export let EmptyState: ComponentType<PropsWithChildren<{
    theme: "light" | "dark";
    className?: string;
    style?: CSSProperties;
}>>;
export let EmptyStateImage: ComponentType<{
    darkSrc: string;
    lightSrc: string;
    width: number;
    height: number;
}>;
export let EmptyStateText: ComponentType<PropsWithChildren<{
    note?: string;
}>>;
// TODO: fix type
export let Flex: ComponentType<PropsWithChildren<any>> & { 
    Align: Record<"START" | "END" | "CENTER" | "STRETCH" | "BASELINE", string>;
    Child: ComponentType<PropsWithChildren<{
        wrap?: boolean;
        grow?: number;
        shrink?: number;
        basis?: string;
        className?: string;
    }>>;
    Direction: Record<"VERTICAL" | "HORIZONTAL" | "HORIZONTAL_REVERSE", string>;
    Justify: Record<"START" | "END" | "CENTER" | "BETWEEN" | "AROUND", string>;
    Wrap: Record<"NO_WRAP" | "WRAP" | "WRAP_REVERSE", string>;
};
export let Flux: {
    connectStores(stores: any[], getStateFromStores: () => any): ((any: any) => ComponentClass<any>);
};
export let FluxDispatcher: {
    _actionHandlers: any;
    _interceptors: (event: { [key: string]: unknown; type: string; }) => void;
    _subscriptions: any;
    dispatch(event: { [key: string]: unknown; type: string; }): Promise<void>;
    isDispatching(): boolean;
    subscribe(event: string, callback: (data: any) => void): void;
    unsubscribe(event: string, callback: (data: any) => void): void;
    wait(callback: () => void): void;
};
export let FormDivider: ComponentType<{
    className?: string;
    style?: CSSProperties;
}>;
export let FormItem: ComponentType<PropsWithChildren<{
    faded?: boolean;
    title?: string;
    className?: string;
}>>;
export let FormNotice: ComponentType<{
    className?: string;
    type: string;
    title: string;
    body: string;
}>;
export let FormSection: ComponentType<PropsWithChildren<{
    /** default is h5 */
    tag?: HeadingTag;
    className?: string;
    titleClassName?: string; 
    titleId?: string;
    title?: ReactNode;
    disabled?: boolean;
    htmlFor?: unknown;
}>>;
export let FormSwitch: ComponentType<PropsWithChildren<{
    value: boolean;
    onChange(value: boolean): void;
 
    disabled?: boolean;
    hideBorder?: boolean;
    className?: string;
    style?: CSSProperties;

    note?: ReactNode;
    tooltipNote?: ReactNode;
}>>;
export let FormText: ComponentType<PropsWithChildren<{
    disabled?: boolean;
    selectable?: boolean;
    /** defaults to FormText.Types.DEFAULT */
    type?: string;
}> & TextProps> & { Types: FormTextTypes; }
export let FormTitle: ComponentType<HTMLProps<HTMLTitleElement> & PropsWithChildren<{
    tag?: HeadingTag;
    faded?: boolean;
    disabled?: boolean;
    required?: boolean;
    error?: ReactNode;
}>>;
export let HeadingLevel: ComponentType<PropsWithChildren<{
    component: ReactNode;
}>>;
export let Heading: ComponentType<PropsWithChildren<{
    variant: TextVariant;
}>>;
export let MessageActionCreators: {
    deleteMessage(channelId: string, messageId: string);
    editMessage(channelId: string, messageId: string, message: any);
};
export let MessageStore: {
    getLastEditableMessage(channelId: string): any | undefined;
};
export let ModalAPI: {
    openModalLazy(render: () => Promise<RenderFunction>, options?: ModalOptions & { contextKey?: string; }): Promise<string>;
    openModal(render: RenderFunction, options?: ModalOptions, contextKey?: string): string;
    closeModal(modalKey: string, contextKey?: string): void;
}
export let ModalCloseButton: ComponentType<{
    focusProps?: any;
    onClick(): void;
    withCircleBackground?: boolean;
    hideOnFullscreen?: boolean;
    className?: string;
}>;
export let ModalContent: ComponentType<PropsWithChildren<{
    className?: string;
    scrollerRef?: Ref<HTMLElement>;
    [prop: string]: any;
}>>;
export let ModalFooter: ComponentType<PropsWithChildren<{
    /** Flex.Justify.START */
    justify?: string;
    /** Flex.Direction.HORIZONTAL_REVERSE */
    direction?: string;
    /** Flex.Align.STRETCH */
    align?: string;
    /** Flex.Wrap.NO_WRAP */
    wrap?: string;
    separator?: boolean;

    className?: string;
}>>;
export let ModalHeader: ComponentType<PropsWithChildren<{
    /** Flex.Justify.START */
    justify?: string;
    /** Flex.Direction.HORIZONTAL */
    direction?: string;
    /** Flex.Align.CENTER */
    align?: string;
    /** Flex.Wrap.NO_WRAP */
    wrap?: string;
    separator?: boolean;

    className?: string;
}>>;
export let ModalRoot: ComponentType<PropsWithChildren<{
    transitionState: ModalTransitionState;
    size?: ModalSize;
    role?: "alertdialog" | "dialog";
    className?: string;
    fullscreenOnMobile?: boolean;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    onAnimationEnd?(): string;
}>>;
export let Slider: ComponentType<PropsWithChildren<{
    initialValue: number;
    defaultValue?: number;
    keyboardStep?: number;
    maxValue?: number;
    minValue?: number;
    markers?: number[];
    stickToMarkers?: boolean;

    markerPosition?: 0 | 1;
    orientation?: "horizontal" | "vertical";
    
    getAriaValueText?(currentValue: number): string;
    renderMarker?(marker: number): ReactNode;
    onMarkerRender?(marker: number): ReactNode;
    onValueRender?(value: number): ReactNode;
    onValueChange?(value: number): void;
    asValueChanges?(value: number): void;
        
    className?: string; 
    disabled?: boolean;
    handleSize?: number;
    mini?: boolean;
    hideBubble?: boolean;
    
    fillStyles?: CSSProperties;
    barStyles?: CSSProperties;
    grabberStyles?: CSSProperties;
    grabberClassName?: string;
    barClassName?: string;

    "aria-hidden"?: boolean;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
}>>;
export let Switch: ComponentType<{
    id?: string;
    checked: boolean;
    disabled?: boolean;
    onChange?(v: boolean): void;
}>;
export type TextProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement> & {
    variant?: TextVariant;
    tag?: "div" | "span" | "p" | "strong" | HeadingTag;
    selectable?: boolean;
    lineClamp?: number;
}>;
export let TabBar: ComponentType<PropsWithChildren<{
    className?: string;
    type: "top" | "bottom";
    look: "brand";
    selectedItem: string;
    onItemSelect(item: string): void;
}>> & {
    Item: ComponentType<PropsWithChildren<{
        className?: string;
        id: string;
    }>>;
}
export let Text: ComponentType<TextProps>;
export let TextInput: ComponentType<PropsWithChildren<{
    name?: string;
    onChange?(value: string, name?: string): void;
    placeholder?: string;
    editable?: boolean;
    maxLength?: number;
    error?: string;

    inputClassName?: string;
    inputPrefix?: string;
    inputRef?: Ref<HTMLInputElement>;
    prefixElement?: ReactNode;

    focusProps?: any;

    /** TextInput.Sizes.DEFAULT */
    size?: string;
} & Omit<HTMLProps<HTMLInputElement>, "onChange" | "size">>> & {
    Sizes: Record<"DEFAULT" | "MEDIUM" | "MINI", string>;
};
export let ThemeStore: any;
export let ToastAPI: {
    createToast(message: string, type: number): Toast;
    showToast(toast: Toast);
    ToastType: Record<"MESSAGE" | "SUCCESS" | "FAILURE" | "CUSTOM" | "CLIP" | "LINK" | "FORWARD", number>
}
export let Tooltip: ComponentType<{
    text: ReactNode;
    children: FunctionComponent<{
        onClick(): void;
        onMouseEnter(): void;
        onMouseLeave(): void;
        onContextMenu(): void;
        onFocus(): void;
        onBlur(): void;
        "aria-label"?: string;
    }>;
    "aria-label"?: string;

    allowOverflow?: boolean;
    forceOpen?: boolean;
    hide?: boolean;
    hideOnClick?: boolean;
    shouldShow?: boolean;
    spacing?: number;

    /** Tooltip.Colors.BLACK */
    color?: string;
    /** TooltipPositions.TOP */
    position?: string;

    tooltipClassName?: string;
    tooltipContentClassName?: string;
}> & {
    Colors: Record<"BLACK" | "BRAND" | "CUSTOM" | "GREEN" | "GREY" | "PRIMARY" | "RED" | "YELLOW", string>;
};
export let SearchBar: ComponentType<PropsWithChildren<{
    onChange?(value: string, name?: string): void;
    onClear?(): void;
    placeholder?: string;

    query: string;

    /** TextInput.Sizes.DEFAULT */
    size?: string;
} & Omit<HTMLProps<HTMLInputElement>, "onChange" | "size">>> & {
    Sizes: Record<"DEFAULT" | "MEDIUM" | "MINI", string>;
};
export let UploadArea: ComponentType<PropsWithChildren<{
    className?: string;
    title: string;
    description: string;
    icons: number[];
    onDrop?: (fileList: FileList) => any;
    onDragClear?: () => any;
    onDragOver?: (dragEvent: DragEvent) => any;
}>>;

export class WebpackModules {
    webpackRequire: WebpackInstance;
    private nekocord: Nekocord;
    private logger = new Logger("WebpackModules", "#6060ff");

    filters = {
        byProps(...props: string[]) {
            return props.length == 1 ? (m: any) => m[props[0]] != undefined : (module: any) => props.every(prop => module[prop] !== undefined);
        },
        byPropsZ(...props: string[]) {
            return props.length == 1 ? (m: any) => m.Z && m.Z[props[0]] != undefined : (module: any) => module.Z && props.every(prop => module.Z[prop] !== undefined);
        },
        byStoreName(storeName: string) {
            return (module: any) => module.Z && module.Z.constructor?.displayName === storeName;
        }
    }

    constructor(nekocord: Nekocord, webpackRequire: WebpackInstance) {
        this.nekocord = nekocord;
        this.webpackRequire = webpackRequire;
        this.logger.log("Initializing WebpackModules");

        this._initCommonModules();
    }

    private _initCommonModules() {
        const reactFilter = this.filters.byProps("useState");
        var reactSubscription = (module: any) => {
            if (reactFilter(module.exports)) {
                React = module.exports;
                useState = React.useState;
                useEffect = React.useEffect;
                useMemo = React.useMemo;
                useRef = React.useRef;
                useReducer = React.useReducer;
                useCallback = React.useCallback;

                this.nekocord.webpackPatcher.removeSubscription(reactSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(reactSubscription);

        const componentsFilter = this.filters.byProps("Button", "FormItem");
        var componentsSubscription = (module: any) => {
            if (componentsFilter(module.exports)) {
                Button = module.exports.Button;
                Card = module.exports.Card;
                ConfirmModal = module.exports.ConfirmModal;
                FormDivider = module.exports.FormDivider;
                FormItem = module.exports.FormItem;
                FormNotice = module.exports.FormNotice;
                FormSection = module.exports.FormSection;
                FormSwitch = module.exports.FormSwitch;
                FormText = module.exports.FormText;
                FormTitle = module.exports.FormTitle;
                HeadingLevel = module.exports.HeadingLevel;
                Heading = module.exports.Heading;
                ModalAPI = module.exports;
                ModalCloseButton = module.exports.ModalCloseButton;
                ModalContent = module.exports.ModalContent;
                ModalFooter = module.exports.ModalFooter;
                ModalHeader = module.exports.ModalHeader;
                ModalRoot = module.exports.ModalRoot;
                TabBar = module.exports.TabBar;
                Text = module.exports.Text;
                TextInput = module.exports.TextInput;
                ToastAPI = module.exports;
                Tooltip = module.exports.Tooltip;
                SearchBar = module.exports.SearchBar;
                Slider = module.exports.Slider;
                Switch = module.exports.Switch;

                this.nekocord.webpackPatcher.removeSubscription(componentsSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(componentsSubscription);

        const emptyStateFilter = this.filters.byProps("EmptyStateImage");
        var emptyStateSubscription = (module: any) => {
            if (emptyStateFilter(module.exports)) {
                EmptyState = module.exports.EmptyState;
                EmptyStateImage = module.exports.EmptyStateImage;
                EmptyStateText = module.exports.EmptyStateText;

                this.nekocord.webpackPatcher.removeSubscription(emptyStateSubscription);
            }
        }
        this.nekocord.webpackPatcher.addSubscription(emptyStateSubscription);

        const flexFilter = this.filters.byPropsZ("Child");
        var flexSubscription = (module: any) => {
            if (flexFilter(module.exports)) {
                Flex = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(flexSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(flexSubscription);

        const messageActionCreatorsFilter = this.filters.byPropsZ("clearChannel");
        var messageActionCreatorsSubscription = (module: any) => {
            if (messageActionCreatorsFilter(module.exports)) {
                MessageActionCreators = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(messageActionCreatorsSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(messageActionCreatorsSubscription);
        
        const fluxDispatcherFilter = this.filters.byPropsZ("_interceptors");
        var fluxDispatcherSubscription = (module: any) => {
            if (module.exports && fluxDispatcherFilter(module.exports)) {
                FluxDispatcher = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(fluxDispatcherSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(fluxDispatcherSubscription);

        const themeStoreFilter = this.filters.byStoreName("ThemeStore");
        var themeStoreSubscription = (module: any) => {
            if (module.exports && themeStoreFilter(module.exports)) {
                ThemeStore = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(themeStoreSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(themeStoreSubscription);

        const messageStoreFilter = this.filters.byStoreName("MessageStore");
        var messageStoreSubscription = (module: any) => {
            if (module.exports && messageStoreFilter(module.exports)) {
                MessageStore = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(messageStoreSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(messageStoreSubscription);

        var fluxSubscription = (module: any) => {
            if (module.exports && Object.keys(module.exports).length == 8 && Object.values(module.exports).find((v: any) => v.connectStores)) {
                Flux = Object.values(module.exports).find((v: any) => v.connectStores) as typeof Flux;

                this.nekocord.webpackPatcher.removeSubscription(fluxSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(fluxSubscription);

        var channelChatResizableSidebarSubscription = (module: any) => {
            if (module.exports && Object.keys(module.exports).length == 2 && module.exports.Z && Object.values(module.exports).find((v: any) => v.PostSidebar === 0)) {
                ChannelChatResizableSidebar = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(channelChatResizableSidebarSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(channelChatResizableSidebarSubscription);

        var uploadAreaSubscription = (module: any) => {
            if (module.exports?.Z?.prototype?.render?.toString?.().indexOf?.('.uploadDropModal') > -1) {
                UploadArea = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(uploadAreaSubscription);
            }
        };
        this.nekocord.webpackPatcher.addSubscription(uploadAreaSubscription);
    }

    find(filter: (module: any) => boolean): any {
        for (const key in this.webpackRequire.c) {
            const module = this.webpackRequire.c[key];
            if (!module.exports) continue;
            if (filter(module.exports)) return module.exports;
            if (module.exports.default && module.exports.default !== window && filter(module.exports.default)) {
                return module.exports.default;
            }
        }
    }

    findByProps(...props: string[]): any {
        return this.find(this.filters.byProps(...props));
    }

    get commonModules() {
        return {
            Button,
            Card,
            ChannelChatResizableSidebar,
            ConfirmModal,
            EmptyState,
            EmptyStateImage,
            EmptyStateText,
            Flex,
            Flux,
            FluxDispatcher,
            FormDivider,
            FormItem,
            FormNotice,
            FormSection,
            FormSwitch,
            FormText,
            FormTitle,
            HeadingLevel,
            Heading,
            MessageActionCreators,
            MessageStore,
            ModalAPI,
            ModalCloseButton,
            ModalContent,
            ModalFooter,
            ModalHeader,
            ModalRoot,
            React,
            SearchBar,
            Slider,
            Switch,
            TabBar,
            Text,
            TextInput,
            ThemeStore,
            Tooltip,
            UploadArea
        };
    }
}