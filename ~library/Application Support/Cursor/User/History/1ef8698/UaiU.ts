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

export let React: typeof import("react");
export let zustand: typeof import("zustand") = {} as any;
export let lodash: typeof import("lodash");
export let ReactRouter: typeof import("react-router-dom");
export let useState: typeof React.useState;
export let useEffect: typeof React.useEffect;
export let useMemo: typeof React.useMemo;
export let useRef: typeof React.useRef;
export let useReducer: typeof React.useReducer;
export let useCallback: typeof React.useCallback;

import type * as Stores from "discord-types/stores";

export let Components: any;

import type {
    CSSProperties,
    ComponentClass,
    ComponentType,
    ForwardedRef,
    FunctionComponent,
    HTMLProps,
    HtmlHTMLAttributes,
    PropsWithChildren,
    ReactNode,
    Ref,
} from "react";
import { proxyLazy, proxyLazyClass } from "../util";

export enum ChatSidebarType {
    PostSidebar,
    ThreadSidebar,
    CallChatSidebar,
    MessageRequestSidebar,
}
export type FormTextTypes = Record<
    | "DEFAULT"
    | "INPUT_PLACEHOLDER"
    | "DESCRIPTION"
    | "LABEL_BOLD"
    | "LABEL_SELECTED"
    | "LABEL_DESCRIPTOR"
    | "ERROR"
    | "SUCCESS",
    string
>;
export type HeadingTag = `h${1 | 2 | 3 | 4 | 5 | 6}`;
export const enum ModalSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    DYNAMIC = "dynamic",
}
export type TextVariant =
    | "heading-sm/normal"
    | "heading-sm/medium"
    | "heading-sm/semibold"
    | "heading-sm/bold"
    | "heading-md/normal"
    | "heading-md/medium"
    | "heading-md/semibold"
    | "heading-md/bold"
    | "heading-lg/normal"
    | "heading-lg/medium"
    | "heading-lg/semibold"
    | "heading-lg/bold"
    | "heading-xl/normal"
    | "heading-xl/medium"
    | "heading-xl/semibold"
    | "heading-xl/bold"
    | "heading-xxl/normal"
    | "heading-xxl/medium"
    | "heading-xxl/semibold"
    | "heading-xxl/bold"
    | "eyebrow"
    | "heading-deprecated-14/normal"
    | "heading-deprecated-14/medium"
    | "heading-deprecated-14/bold"
    | "text-xxs/normal"
    | "text-xxs/medium"
    | "text-xxs/semibold"
    | "text-xxs/bold"
    | "text-xs/normal"
    | "text-xs/medium"
    | "text-xs/semibold"
    | "text-xs/bold"
    | "text-sm/normal"
    | "text-sm/medium"
    | "text-sm/semibold"
    | "text-sm/bold"
    | "text-md/normal"
    | "text-md/medium"
    | "text-md/semibold"
    | "text-md/bold"
    | "text-lg/normal"
    | "text-lg/medium"
    | "text-lg/semibold"
    | "text-lg/bold"
    | "display-sm"
    | "display-md"
    | "display-lg"
    | "code";
export interface Toast {
    message: string;
    id: string;
    type: number;
    options: {
        position: number;
        component?: ReactNode;
        duration: number;
    };
}
export type TooltipPositions = Record<
    "BOTTOM" | "CENTER" | "LEFT" | "RIGHT" | "TOP" | "WINDOW_CENTER",
    string
>;
export const enum ModalTransitionState {
    ENTERING,
    ENTERED,
    EXITING,
    EXITED,
    HIDDEN,
}
export interface ModalOptions {
    modalKey?: string;
    onCloseRequest?: () => void;
    onCloseCallback?: () => void;
}
export interface ModalProps {
    transitionState: ModalTransitionState;
    onClose(): Promise<void>;
}
export type RenderFunction = (props: ModalProps) => ReactNode;

export let RouterUtils: {
    transitionTo(route: string, options?: any): void;
    transitionToGuild(guildId: string): void;
    currentRouteHasBackNavigation(): boolean;
    replaceWith(route: string, options?: any): void;
    getHistory(): any;
    getLastRouteChangeSource(): string;
    getLastRouteChangeSourceLocationStack(): any;
    isValidFingerprintRoute(route: string): boolean;
    getFingerprintLocation(): string;
    hasNavigated(): boolean;
    back(): void;
    forward(): void;
};
export let Icon: ComponentType<{
    size: string;
    color: string;
}>;
export let AdvancedScroller: ComponentType<
    PropsWithChildren<{
        className?: string;
        ref: Ref<HTMLDivElement>;
        onScroll?(): void;
    }>
>;
export let Anchor: ComponentType<
    PropsWithChildren<{
        onClick(): void;
    }>
>;
export let Button: ComponentType<
    PropsWithChildren<
        Omit<HTMLProps<HTMLButtonElement>, "size"> & {
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
        }
    >
> & {
    BorderColors: Record<
        | "BLACK"
        | "BRAND"
        | "BRAND_NEW"
        | "GREEN"
        | "LINK"
        | "PRIMARY"
        | "RED"
        | "TRANSPARENT"
        | "WHITE"
        | "YELLOW",
        string
    >;
    Colors: Record<
        | "BRAND"
        | "RED"
        | "GREEN"
        | "YELLOW"
        | "PRIMARY"
        | "LINK"
        | "WHITE"
        | "BLACK"
        | "TRANSPARENT"
        | "BRAND_NEW"
        | "CUSTOM",
        string
    >;
    Hovers: Record<
        | "DEFAULT"
        | "BRAND"
        | "RED"
        | "GREEN"
        | "YELLOW"
        | "PRIMARY"
        | "LINK"
        | "WHITE"
        | "BLACK"
        | "TRANSPARENT",
        string
    >;
    Looks: Record<
        "FILLED" | "INVERTED" | "OUTLINED" | "LINK" | "BLANK",
        string
    >;
    Sizes: Record<
        | "NONE"
        | "TINY"
        | "SMALL"
        | "MEDIUM"
        | "LARGE"
        | "XLARGE"
        | "MIN"
        | "MAX"
        | "ICON",
        string
    >;

    Link: any;
};
export let Card: ComponentType<
    PropsWithChildren<
        HTMLProps<HTMLDivElement> & {
            editable?: boolean;
            outline?: boolean;
            /** Card.Types.PRIMARY */
            type?: string;
        }
    >
> & {
    Types: Record<
        "BRAND" | "CUSTOM" | "DANGER" | "PRIMARY" | "SUCCESS" | "WARNING",
        string
    >;
};
export let ChannelChatResizableSidebar: ComponentType<
    PropsWithChildren<{
        sidebarType: ChatSidebarType;
        maxWidth: number;
        onWidthChange?: (newWidth: number, isFloating: boolean) => void;
        floatingLayer?: (props: any) => JSX.Element;
    }>
>;
export let CircleXIcon: ComponentType<{
    size: string;
    color: string;
}>;
export let Clickable: ComponentType<
    PropsWithChildren<{
        onClick(): void;
        focusProps?: {
            offset: {
                top: number;
                left: number;
                right: number;
            };
        };
        className?: string;
        ariaLabel?: string;
        tag?: string;
    }>
>;
export let XSmallIcon: ComponentType<{
    size: string;
    color: string;
}>;
export let ConfirmModal: ComponentType<
    PropsWithChildren<{
        className?: string;
        bodyClassName?: string;
        header?: ReactNode; // TODO: check type
        confirmText?: string;
        cancelText?: string;
        onConfirm?(): void;
        confirmButtonColor?: (typeof Button.Colors)[keyof typeof Button.Colors];
    }>
>;
export let EmptyState: ComponentType<
    PropsWithChildren<{
        theme: "light" | "dark";
        className?: string;
        style?: CSSProperties;
    }>
>;
export let EmptyStateImage: ComponentType<{
    darkSrc: string;
    lightSrc: string;
    width: number;
    height: number;
}>;
export let EmptyStateText: ComponentType<
    PropsWithChildren<{
        note?: string;
    }>
>;
// TODO: fix type
export let Flex: ComponentType<PropsWithChildren<any>> & {
    Align: Record<"START" | "END" | "CENTER" | "STRETCH" | "BASELINE", string>;
    Child: ComponentType<
        PropsWithChildren<{
            wrap?: boolean;
            grow?: number;
            shrink?: number;
            basis?: string;
            className?: string;
        }>
    >;
    Direction: Record<"VERTICAL" | "HORIZONTAL" | "HORIZONTAL_REVERSE", string>;
    Justify: Record<"START" | "END" | "CENTER" | "BETWEEN" | "AROUND", string>;
    Wrap: Record<"NO_WRAP" | "WRAP" | "WRAP_REVERSE", string>;
};
export let Flux: {
    connectStores(
        stores: any[],
        getStateFromStores: () => any,
    ): (any: any) => ComponentClass<any>;
};
export let FluxDispatcher: {
    _actionHandlers: any;
    _interceptors: [(event: { [key: string]: unknown; type: string }) => void];
    _subscriptions: any;
    dispatch(event: { [key: string]: unknown; type: string }): Promise<void>;
    isDispatching(): boolean;
    subscribe(event: string, callback: (data: any) => void): void;
    unsubscribe(event: string, callback: (data: any) => void): void;
    wait(callback: () => void): void;
};
export let FocusRing: ComponentType<PropsWithChildren<any>>;
export let FocusRingScope: ComponentType<
    PropsWithChildren<{
        containerRef: Ref<HTMLElement>;
    }>
>;
export let FormDivider: ComponentType<{
    className?: string;
    style?: CSSProperties;
}>;
export let FormItem: ComponentType<
    PropsWithChildren<{
        faded?: boolean;
        title?: string;
        className?: string;
    }>
>;
export let FormNotice: ComponentType<{
    className?: string;
    type: string;
    title: string;
    body: string;
}>;
export let FormSection: ComponentType<
    PropsWithChildren<{
        /** default is h5 */
        tag?: HeadingTag;
        className?: string;
        titleClassName?: string;
        titleId?: string;
        title?: ReactNode;
        disabled?: boolean;
        htmlFor?: unknown;
    }>
>;
export let FormSwitch: ComponentType<
    PropsWithChildren<{
        value: boolean;
        onChange(value: boolean): void;

        disabled?: boolean;
        hideBorder?: boolean;
        className?: string;
        style?: CSSProperties;

        note?: ReactNode;
        tooltipNote?: ReactNode;
    }>
>;
export let FormText: ComponentType<
    PropsWithChildren<{
        disabled?: boolean;
        selectable?: boolean;
        /** defaults to FormText.Types.DEFAULT */
        type?: string;
    }> &
        TextProps
> & { Types: FormTextTypes };
export let FormTitle: ComponentType<
    HTMLProps<HTMLTitleElement> &
        PropsWithChildren<{
            tag?: HeadingTag;
            faded?: boolean;
            disabled?: boolean;
            required?: boolean;
            error?: ReactNode;
        }>
>;
export let HeadingLevel: ComponentType<
    PropsWithChildren<{
        component?: ReactNode;
        forceLevel?: number;
    }>
>;
export let Heading: ComponentType<
    PropsWithChildren<{
        variant: TextVariant;
        className?: string;
        color?: string;
    }>
>;
export let LocaleStore: {
    get locale(): string;
};
export let Menu: ComponentType<
    PropsWithChildren<{
        navId: string;
        "aria-label"?: string;
        onClose?(): void;
        onSelect?(id: string): void;
    }>
>;
export let MenuCheckboxItem: ComponentType<{
    id: string;
    label: ReactNode;
    action(): void;
    checked: boolean;
}>;
export let MenuGroup: ComponentType<
    PropsWithChildren<{
        label?: string;
        className?: string;
    }>
>;
/* Incomplete type, feel free to PR if it's missing anything you need */
export let MenuItem: ComponentType<
    PropsWithChildren<{
        id: string;
        label: ReactNode;
        subtext?: ReactNode;
        color?: "danger";
        icon?: ReactNode;
        iconLeft?: ReactNode;
        action(): void;
    }>
>;
export let MenuRadioItem: ComponentType<{
    group: string;
    id: string;
    label: ReactNode;
    action(): void;
    checked: boolean;
}>;
export let MessageActionCreators: {
    deleteMessage(channelId: string, messageId: string);
    editMessage(channelId: string, messageId: string, message: any);
};
export let MessageStore: {
    getLastEditableMessage(channelId: string): any | undefined;
};
export let ModalAPI: {
    openModalLazy(
        render: () => Promise<RenderFunction>,
        options?: ModalOptions & { contextKey?: string },
    ): Promise<string>;
    openModal(
        render: RenderFunction,
        options?: ModalOptions,
        contextKey?: string,
    ): string;
    closeModal(modalKey: string, contextKey?: string): void;
};
export let ModalCloseButton: ComponentType<{
    focusProps?: any;
    onClick(): void;
    withCircleBackground?: boolean;
    hideOnFullscreen?: boolean;
    className?: string;
}>;
export let ModalContent: ComponentType<
    PropsWithChildren<{
        className?: string;
        scrollerRef?: Ref<HTMLElement>;
        [prop: string]: any;
    }>
>;
export let ModalFooter: ComponentType<
    PropsWithChildren<{
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
    }>
>;
export let ModalHeader: ComponentType<
    PropsWithChildren<{
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
    }>
>;
export let ModalRoot: ComponentType<
    PropsWithChildren<{
        transitionState: ModalTransitionState;
        size?: ModalSize;
        role?: "alertdialog" | "dialog";
        className?: string;
        fullscreenOnMobile?: boolean;
        "aria-label"?: string;
        "aria-labelledby"?: string;
        onAnimationEnd?(): string;
    }>
>;
export let Notice: ComponentType<
    PropsWithChildren<{
        color: string;
    }>
>;
export let NoticeCloseButton: ComponentType<{
    onClick(): void;
    noticeType: string;
}>;
export let NoticeColors: Record<
    | "BRAND"
    | "CUSTOM"
    | "DANGER"
    | "DEFAULT"
    | "INFO"
    | "NEUTRAL"
    | "PLAYSTATION"
    | "PREMIUM_TIER_0"
    | "PREMIUM_TIER_1"
    | "PREMIUM_TIER_2"
    | "SPOTIFY"
    | "STREAMER_MODE"
    | "WARNING",
    string
>;
export let Paginator: ComponentType<{
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageChange(page: number): void;
    disablePaginationGap?: boolean;
}>;
export let Parser: Record<
    | "parse"
    | "parseTopic"
    | "parseEmbedTitle"
    | "parseInlineReply"
    | "parseGuildVerificationFormRule"
    | "parseGuildEventDescription"
    | "parseAutoModerationSystemMessage"
    | "parseForumPostGuidelines"
    | "parseForumPostMostRecentMessage",
    (
        content: string,
        inline?: boolean,
        state?: Record<string, any>,
    ) => ReactNode[]
> &
    Record<
        "defaultRules" | "guildEventRules",
        Record<
            string,
            Record<"react" | "html" | "parse" | "match" | "order", any>
        >
    >;
/* Incomplete type, feel free to PR if it's missing anything you need */
export let Popout: ComponentType<{
    position: "left" | "right";
    align: "top" | "bottom";
    animation: string;
    children: (props) => ReactNode;
    renderPopout: (e: { closePopout(): void }) => ReactNode;
}> & {
    Animation: Record<"NONE", string>;
};
export let PrimaryCTANoticeButton: ComponentType<
    PropsWithChildren<{
        onClick(): void;
        noticeType: string;
    }>
>;
export let Slider: ComponentType<
    PropsWithChildren<{
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
    }>
>;
export let Spinner: ComponentType<{
    className?: string;
    type: string;
}> & {
    Type: Record<
        | "CHASING_DOTS"
        | "LOW_MOTION"
        | "PULSING_ELLIPSIS"
        | "SPINNING_CIRCLE"
        | "SPINNING_CIRCLE_SIMPLE"
        | "WANDERING_CUBES",
        string
    >;
};
export let Switch: ComponentType<{
    id?: string;
    checked: boolean;
    disabled?: boolean;
    onChange?(v: boolean): void;
}>;
export type TextProps = PropsWithChildren<
    HtmlHTMLAttributes<HTMLDivElement> & {
        variant?: TextVariant;
        tag?: "div" | "span" | "p" | "strong" | HeadingTag;
        selectable?: boolean;
        lineClamp?: number;
    }
>;
export let TabBar: ComponentType<
    PropsWithChildren<{
        className?: string;
        type: "top" | "bottom" | "top-pill";
        look?: "brand";
        selectedItem: any;
        onItemSelect(item: any): void;
        orientation?: "vertical";
    }>
> & {
    Item: ComponentType<
        PropsWithChildren<{
            className?: string;
            id: any;
            disableItemStyles?: boolean;
        }>
    >;
};
export let Text: ComponentType<TextProps>;
export let TextInput: ComponentType<
    PropsWithChildren<
        {
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
        } & Omit<HTMLProps<HTMLInputElement>, "onChange" | "size">
    >
> & {
    Sizes: Record<"DEFAULT" | "MEDIUM" | "MINI", string>;
};
export let ThemeStore: any;
export let ToastAPI: {
    createToast(message: string, type: number): Toast;
    showToast(toast: Toast);
    ToastType: Record<
        | "MESSAGE"
        | "SUCCESS"
        | "FAILURE"
        | "CUSTOM"
        | "CLIP"
        | "LINK"
        | "FORWARD",
        number
    >;
};
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
    Colors: Record<
        | "BLACK"
        | "BRAND"
        | "CUSTOM"
        | "GREEN"
        | "GREY"
        | "PRIMARY"
        | "RED"
        | "YELLOW",
        string
    >;
};
export let UserStore: Stores.UserStore;
export let SearchBar: ComponentType<
    PropsWithChildren<
        {
            onChange?(value: string, name?: string): void;
            onClear?(): void;
            placeholder?: string;

            query: string;

            /** TextInput.Sizes.DEFAULT */
            size?: string;
        } & Omit<HTMLProps<HTMLInputElement>, "onChange" | "size">
    >
> & {
    Sizes: Record<"DEFAULT" | "MEDIUM" | "MINI", string>;
};
export let SearchBox: ComponentType<
    PropsWithChildren<{
        onChange?(value: string, name?: string): void;
        onClear?(): void;
        onFocus?(): void;
        onBlur?(): void;
        onKeyPress?(e: React.KeyboardEvent<HTMLInputElement>): void;
        placeholder?: string;
        label?: string;
        cta?: string;
        autoFocus?: boolean;

        searchTerm: string;
        canShowCta?: boolean;

        ref: ForwardedRef<unknown>;
        className?: string;
    }>
>;
export let UploadArea: ComponentType<
    PropsWithChildren<{
        className?: string;
        title: string;
        description: string;
        icons: number[];
        onDrop?: (fileList: FileList) => any;
        onDragClear?: () => any;
        onDragOver?: (dragEvent: DragEvent) => any;
    }>
>;

export class WebpackModules {
    webpackRequire: WebpackInstance;
    private nekocord: Nekocord;
    private logger = new Logger("WebpackModules", "#6060ff");

    filters = {
        byProps(...props: string[]) {
            return props.length == 1
                ? (m: any) => m[props[0]] != undefined
                : (module: any) =>
                      props.every(prop => module[prop] !== undefined);
        },
        byPropsZ(...props: string[]) {
            return props.length == 1
                ? (m: any) => m.Z && m.Z[props[0]] != undefined
                : (module: any) =>
                      module.Z &&
                      props.every(prop => module.Z[prop] !== undefined);
        },
        byStoreName(storeName: string) {
            return (module: any) =>
                module.constructor?.displayName === storeName;
        },
        byCode(...code: string[]) {
            return m => {
                if (typeof m !== "function") return false;
                const fn = Function.prototype.toString.call(m);
                return code.every(c => fn.includes(c));
            };
        },
    };

    constructor(nekocord: Nekocord, webpackRequire: WebpackInstance) {
        this.nekocord = nekocord;
        this.webpackRequire = webpackRequire;
        this.logger.log("Initializing WebpackModules");

        this._initCommonModules();
    }

    private _initCommonModules() {
        /*const reactFilter = this.filters.byProps("useState");
        const reactSubscription = (module: any) => {
            if (reactFilter(module.exports)) {
                React = module.exports;
                useState = React.useState;
                useEffect = React.useEffect;
                useMemo = React.useMemo;
                useRef = React.useRef;
                useReducer = React.useReducer;
                useCallback = React.useCallback;

                this.nekocord.webpackPatcher.removeSubscription(
                    reactSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(reactSubscription);*/
        React = proxyLazy(() => {
            const module = this.findByProps("useState");
            useState = module.useState;
            useEffect = module.useEffect;
            useMemo = module.useMemo;
            useRef = module.useRef;
            useReducer = module.useReducer;
            useCallback = module.useCallback;
            return module;
        }) as any;

        const componentsFilter = this.filters.byProps("Button", "FormItem");
        const componentsSubscription = (module: any) => {
            if (componentsFilter(module.exports)) {
                AdvancedScroller = module.exports.AdvancedScroller;
                Anchor = module.exports.Anchor;
                Button = module.exports.Button;
                Card = module.exports.Card;
                CircleXIcon = module.exports.CircleXIcon;
                Clickable = module.exports.Clickable;
                XSmallIcon = module.exports.XSmallIcon;
                ConfirmModal = module.exports.ConfirmModal;
                EmptyState = module.exports.EmptyState;
                EmptyStateImage = module.exports.EmptyStateImage;
                EmptyStateText = module.exports.EmptyStateText;
                FocusRing = module.exports.FocusRing;
                FocusRingScope = module.exports.FocusRingScope;
                FormDivider = module.exports.FormDivider;
                FormItem = module.exports.FormItem;
                FormNotice = module.exports.FormNotice;
                FormSection = module.exports.FormSection;
                FormSwitch = module.exports.FormSwitch;
                FormText = module.exports.FormText;
                FormTitle = module.exports.FormTitle;
                HeadingLevel = module.exports.HeadingLevel;
                Heading = module.exports.Heading;
                Menu = module.exports.Menu;
                MenuCheckboxItem = module.exports.MenuCheckboxItem;
                MenuGroup = module.exports.MenuGroup;
                MenuItem = module.exports.MenuItem;
                MenuRadioItem = module.exports.MenuRadioItem;
                ModalAPI = module.exports;
                ModalCloseButton = module.exports.ModalCloseButton;
                ModalContent = module.exports.ModalContent;
                ModalFooter = module.exports.ModalFooter;
                ModalHeader = module.exports.ModalHeader;
                ModalRoot = module.exports.ModalRoot;
                Notice = module.exports.Notice;
                NoticeCloseButton = module.exports.NoticeCloseButton;
                NoticeColors = module.exports.NoticeColors;
                Paginator = module.exports.Paginator;
                Popout = module.exports.Popout;
                PrimaryCTANoticeButton = module.exports.PrimaryCTANoticeButton;
                TabBar = module.exports.TabBar;
                Text = module.exports.Text;
                TextInput = module.exports.TextInput;
                ToastAPI = module.exports;
                Tooltip = module.exports.Tooltip;
                SearchBar = module.exports.SearchBar;
                SearchBox = module.exports.SearchBox;
                Slider = module.exports.Slider;
                Spinner = module.exports.Spinner;
                Switch = module.exports.Switch;

                Components = module.exports;

                this.nekocord.webpackPatcher.removeSubscription(
                    componentsSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(componentsSubscription);

        const flexFilter = this.filters.byPropsZ("Child");
        const flexSubscription = (module: any) => {
            if (flexFilter(module.exports)) {
                Flex = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(
                    flexSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(flexSubscription);

        const messageActionCreatorsFilter =
            this.filters.byPropsZ("clearChannel");
        const messageActionCreatorsSubscription = (module: any) => {
            if (messageActionCreatorsFilter(module.exports)) {
                MessageActionCreators = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(
                    messageActionCreatorsSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(
            messageActionCreatorsSubscription,
        );

        const fluxDispatcherFilter = this.filters.byPropsZ("_interceptors");
        const fluxDispatcherSubscription = (module: any) => {
            if (module.exports && fluxDispatcherFilter(module.exports)) {
                FluxDispatcher = module.exports.Z;

                const subscription = () => {
                    this.nekocord.webpackPatcher._finishInitialization();
                    FluxDispatcher.unsubscribe("CONNECTION_OPEN", subscription);
                };
                FluxDispatcher.subscribe("CONNECTION_OPEN", subscription);

                this.nekocord.webpackPatcher.removeSubscription(
                    fluxDispatcherSubscription,
                );
                FluxDispatcher._interceptors.push(event => {
                    [...this.nekocord.pluginManager.plugins.values()]
                        .filter(
                            p =>
                                p.enabled &&
                                typeof p.instance.info.flux?.[event.type] ===
                                    "function",
                        )
                        .forEach(p => p.instance.info.flux[event.type](event));
                });
            }
        };
        this.nekocord.webpackPatcher.addSubscription(
            fluxDispatcherSubscription,
        );

        const parserFilter = this.filters.byPropsZ("parseTopic");
        const parserSubscription = (module: any) => {
            if (module.exports && parserFilter(module.exports)) {
                Parser = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(
                    parserSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(parserSubscription);

        const themeStoreFilter = this.filters.byStoreName("ThemeStore");
        const themeStoreSubscription = (module: any) => {
            if (
                module.exports &&
                module.exports.Z &&
                themeStoreFilter(module.exports.Z)
            ) {
                ThemeStore = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(
                    themeStoreSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(themeStoreSubscription);

        const userStoreFilter = this.filters.byStoreName("UserStore");
        const userStoreSubscription = (module: any) => {
            if (
                module.exports &&
                module.exports.default &&
                userStoreFilter(module.exports.default)
            ) {
                UserStore = module.exports.default;

                this.nekocord.webpackPatcher.removeSubscription(
                    userStoreSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(userStoreSubscription);

        const messageStoreFilter = this.filters.byStoreName("MessageStore");
        const messageStoreSubscription = (module: any) => {
            if (
                module.exports &&
                module.exports.Z &&
                messageStoreFilter(module.exports.Z)
            ) {
                MessageStore = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(
                    messageStoreSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(messageStoreSubscription);

        const localeStoreFilter = this.filters.byStoreName("LocaleStore");
        const localeStoreSubscription = (module: any) => {
            if (
                module.exports &&
                module.exports.default &&
                localeStoreFilter(module.exports.default)
            ) {
                LocaleStore = module.exports.default;

                this.nekocord.webpackPatcher.removeSubscription(
                    localeStoreSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(localeStoreSubscription);

        /*const fluxSubscription = (module: any) => {
            if (
                module.exports &&
                Object.keys(module.exports).length > 7 &&
                Object.keys(module.exports).length < 11 &&
                Object.values(module.exports).find((v: any) => v.connectStores)
            ) {
                Flux = Object.values(module.exports).find(
                    (v: any) => v.connectStores,
                ) as typeof Flux;

                this.nekocord.webpackPatcher.removeSubscription(
                    fluxSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(fluxSubscription);*/
        Flux = this.findByPropsLazy("connectStores");

        /*const channelChatResizableSidebarSubscription = (module: any) => {
            if (
                module.exports &&
                Object.keys(module.exports).length == 2 &&
                module.exports.Z &&
                Object.values(module.exports).find(
                    (v: any) => v.PostSidebar === 0,
                )
            ) {
                ChannelChatResizableSidebar = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(
                    channelChatResizableSidebarSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(
            channelChatResizableSidebarSubscription,
        );*/
        ChannelChatResizableSidebar = proxyLazy(
            () => this.findParentModule(this.filters.byProps("PostSidebar")).Z,
        );

        /*const uploadAreaSubscription = (module: any) => {
            if (
                module.exports?.Z?.prototype?.render
                    ?.toString?.()
                    .indexOf?.(".uploadDropModal") > -1
            ) {
                UploadArea = module.exports.Z;

                this.nekocord.webpackPatcher.removeSubscription(
                    uploadAreaSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(uploadAreaSubscription);*/
        UploadArea = proxyLazyClass(() => this.findByCode(".uploadDropModal"));

        /*const routerUtilsSubscription = (module: any) => {
            if (
                module.exports &&
                Object.keys(module.exports).length == 12 &&
                Object.values(module.exports).find((f: any) =>
                    f?.toString?.().includes("transitionToGuild"),
                )
            ) {
                RouterUtils = module.exports;
                function findInFunction(str: string) {
                    return Object.values(module.exports).find((f: any) =>
                        f?.toString?.().includes(str),
                    ) as any;
                }
                RouterUtils.transitionTo = findInFunction("transitionTo -");
                RouterUtils.transitionToGuild =
                    findInFunction("transitionToGuild");
                RouterUtils.currentRouteHasBackNavigation = findInFunction(
                    "ChannelBackNavigationSources.has",
                );
                RouterUtils.replaceWith = findInFunction("Replacing route");
                RouterUtils.getHistory = findInFunction(
                    `return ${RouterUtils.replaceWith.toString().match(/\?(.+?)\.replace/)[1]}}`,
                );
                RouterUtils.getLastRouteChangeSource = findInFunction(
                    `return ${RouterUtils.replaceWith.toString().match(/([A-Za-z_$][\w$]*)=[A-Za-z_$][\w$]* /)[1]}}`,
                );
                RouterUtils.getLastRouteChangeSourceLocationStack =
                    findInFunction(
                        `return ${RouterUtils.transitionTo.toString().match(/,([A-Za-z_$][\w$]*)=[A-Za-z_$][\w$]*}/)[1]}}`,
                    );
                RouterUtils.isValidFingerprintRoute =
                    findInFunction("Routes.HANDOFF");
                RouterUtils.getFingerprintLocation =
                    findInFunction("Routes.LOGIN");
                RouterUtils.hasNavigated = Object.values(module.exports).find(
                    (f: any) =>
                        /{return [A-Za-z_$][\w$]*;/.test(f?.toString?.()) &&
                        ![
                            RouterUtils.getHistory,
                            RouterUtils.getLastRouteChangeSource,
                            RouterUtils.getLastRouteChangeSourceLocationStack,
                        ].includes(f),
                ) as any;
                RouterUtils.back = findInFunction("goBack");
                RouterUtils.forward = findInFunction("goForward");

                this.nekocord.webpackPatcher.removeSubscription(
                    routerUtilsSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(routerUtilsSubscription);*/

        RouterUtils = proxyLazy(() => {
            const module = this.findParentModule(
                this.filters.byCode("transitionTo -"),
            );
            function findInFunction(str: string) {
                return Object.values(module).find((f: any) =>
                    f?.toString?.().includes(str),
                ) as any;
            }
            module.transitionTo = findInFunction("transitionTo -");
            module.transitionToGuild = findInFunction("transitionToGuild");
            module.currentRouteHasBackNavigation = findInFunction(
                "ChannelBackNavigationSources.has",
            );
            module.replaceWith = findInFunction("Replacing route");
            module.getHistory = findInFunction(
                `return ${module.replaceWith.toString().match(/\?(.+?)\.replace/)[1]}}`,
            );
            module.getLastRouteChangeSource = findInFunction(
                `return ${module.replaceWith.toString().match(/([A-Za-z_$][\w$]*)=[A-Za-z_$][\w$]*/)[1]}}`,
            );
            module.getLastRouteChangeSourceLocationStack = findInFunction(
                `return ${module.transitionTo.toString().match(/,([A-Za-z_$][\w$]*)=[A-Za-z_$][\w$]*}/)[1]}}`,
            );
            module.isValidFingerprintRoute = findInFunction("Routes.HANDOFF");
            module.getFingerprintLocation = findInFunction("Routes.LOGIN");
            module.hasNavigated = Object.values(module).find(
                (f: any) =>
                    /{return [A-Za-z_$][\w$]*;/.test(f?.toString?.()) &&
                    ![
                        module.getHistory,
                        module.getLastRouteChangeSource,
                        module.getLastRouteChangeSourceLocationStack,
                    ].includes(f),
            ) as any;
            module.back = findInFunction("goBack");
            module.forward = findInFunction("goForward");
            return module;
        }) as any;

        /*const zustandFilter = this.filters.byCode("will be removed in v4");
        const zustandSubscription = (module: any) => {
            if (
                module.exports &&
                module.exports.Z &&
                zustandFilter(module.exports.Z)
            ) {
                (zustand as any).create = module.exports.Z;
                this.nekocord.webpackPatcher.removeSubscription(
                    zustandSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(zustandSubscription);*/

        /*const zustandPersistFilter = this.filters.byCode("zustand persist middleware");
        const zustandPersistSubscription = (module: any) => {
            let persist: any = null;
            if (
                module.exports &&
                Object.keys(module.exports).length == 2 &&
                (persist = Object.values(module.exports).find(
                    (f: any) =>
                        typeof f === "function" &&
                        zustandPersistFilter(f),
                ))
            ) {
                (zustand as any).persist = persist;
                this.nekocord.webpackPatcher.removeSubscription(
                    zustandPersistSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(zustandPersistSubscription);*/

        zustand = proxyLazy(() => {
            const persist = this.findByCodeLazy("zustand persist middleware");
            const create = this.findByCodeLazy("will be removed in v4");
            return {
                create,
                persist,
            };
        });

        /*const reactRouterSubscription = (module: any) => {
            if (
                module.exports &&
                Object.keys(module.exports).length == 11 &&
                Object.values(module.exports).find(
                    (f: any) =>
                        typeof f === "function" &&
                        f?.toString?.().includes('"withRouter("'),
                )
            ) {
                ReactRouter = module.exports;
                function findInFunction(str: string) {
                    return Object.values(module.exports).find(
                        (f: any) =>
                            typeof f === "function" &&
                            f.toString().includes(str),
                    ) as any;
                }
                ReactRouter.Redirect = findInFunction(".computedMatch,");
                ReactRouter.Route = findInFunction(".computedMatch:");
                ReactRouter.Router = findInFunction("._pendingLocation");
                ReactRouter.Switch = findInFunction(".isValidElement");
                ReactRouter.matchPath = findInFunction('("string"');
                ReactRouter.useHistory = Object.values(module.exports).find(
                    (f: any) =>
                        typeof f === "function" &&
                        /{return [A-Za-z_$][\w$]*\([A-Za-z_$][\w$]*\)}/.test(
                            f.toString(),
                        ),
                ) as any;
                ReactRouter.useLocation = findInFunction(").location");
                ReactRouter.useParams = findInFunction(".params:");
                ReactRouter.useRouteMatch = findInFunction(".pathname,");
                ReactRouter.withRouter = findInFunction('"withRouter("');

                this.nekocord.webpackPatcher.removeSubscription(
                    reactRouterSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(reactRouterSubscription);*/
        ReactRouter = proxyLazy(() => {
            const module = this.findParentModule(
                this.filters.byCode('"withRouter'),
            );
            function findInFunction(str: string) {
                return Object.values(module).find(
                    (f: any) =>
                        typeof f === "function" && f.toString().includes(str),
                ) as any;
            }
            function findInRender(str: string) {
                return Object.values(module)
                    .filter((e: any) => e?.prototype?.render)
                    .find(
                        (f: any) =>
                            typeof f === "function" &&
                            f.prototype.render.toString().includes(str),
                    ) as any;
            }
            module.Redirect = findInFunction(".computedMatch,");
            module.Route = findInRender(".computedMatch:");
            module.Router = findInFunction("._pendingLocation");
            module.Switch = findInRender(".isValidElement");
            module.matchPath = findInFunction('("string"');
            module.useHistory = Object.values(module).find(
                (f: any) =>
                    typeof f === "function" &&
                    /{return [A-Za-z_$][\w$]*\([A-Za-z_$][\w$]*\)}/.test(
                        f.toString(),
                    ),
            ) as any;
            module.useLocation = findInFunction(").location");
            module.useParams = findInFunction(".params:");
            module.useRouteMatch = findInFunction(".pathname,");
            module.withRouter = findInFunction('"withRouter("');
            return module;
        }) as any;

        const lodashFilter = this.filters.byProps("debounce");
        const lodashSubscription = (module: any) => {
            if (module.exports && lodashFilter(module.exports)) {
                lodash = module.exports;

                this.nekocord.webpackPatcher.removeSubscription(
                    lodashSubscription,
                );
            }
        };
        this.nekocord.webpackPatcher.addSubscription(lodashSubscription);
    }

    find(filter: (module: any) => boolean): any {
        for (const key in this.webpackRequire.c) {
            const module = this.webpackRequire.c[key];
            if (!module.loaded || !module.exports) continue;
            if (filter(module.exports)) return module.exports;
            if (module.exports.default && filter(module.exports.default)) {
                return module.exports.default;
            }
            for (const nestedMod in module.exports)
                if (nestedMod.length <= 3) {
                    const nested = module.exports[nestedMod];
                    if (nested && filter(nested)) {
                        return nested;
                    }
                }
        }
    }

    findParentModule(filter: (module: any) => boolean): any {
        for (const key in this.webpackRequire.c) {
            const module = this.webpackRequire.c[key];
            if (!module.loaded || !module.exports) continue;
            if (filter(module.exports)) return module.exports;
            if (module.exports.default && filter(module.exports.default)) {
                return module.exports.default;
            }
            for (const nestedMod in module.exports)
                if (nestedMod.length <= 3) {
                    const nested = module.exports[nestedMod];
                    if (nested && filter(nested)) {
                        return module.exports;
                    }
                }
        }
    }

    findByProps(...props: string[]): any {
        return this.find(this.filters.byProps(...props));
    }

    findByPropsLazy(...props: string[]): any {
        return proxyLazy(() => this.findByProps(...props));
    }

    findByStoreName(storeName: string): any {
        return this.find(this.filters.byStoreName(storeName));
    }

    findByCode(...code: string[]): any {
        return this.find(this.filters.byCode(...code));
    }

    findByCodeLazy(...code: string[]): any {
        return proxyLazy(() => this.findByCode(...code));
    }

    get commonModules() {
        return {
            AdvancedScroller,
            Anchor,
            Button,
            Card,
            ChannelChatResizableSidebar,
            CircleXIcon,
            Clickable,
            XSmallIcon,
            ConfirmModal,
            EmptyState,
            EmptyStateImage,
            EmptyStateText,
            Flex,
            Flux,
            FluxDispatcher,
            FocusRing,
            FocusRingScope,
            FormDivider,
            FormItem,
            FormNotice,
            FormSection,
            FormSwitch,
            FormText,
            FormTitle,
            HeadingLevel,
            Heading,
            LocaleStore,
            lodash,
            Menu,
            MenuCheckboxItem,
            MenuGroup,
            MenuItem,
            MenuRadioItem,
            MessageActionCreators,
            MessageStore,
            ModalAPI,
            ModalCloseButton,
            ModalContent,
            ModalFooter,
            ModalHeader,
            ModalRoot,
            RouterUtils,
            Notice,
            NoticeCloseButton,
            NoticeColors,
            Parser,
            Paginator,
            PrimaryCTANoticeButton,
            React,
            ReactRouter,
            SearchBar,
            SearchBox,
            Slider,
            Spinner,
            Switch,
            TabBar,
            Text,
            TextInput,
            ThemeStore,
            Tooltip,
            UploadArea,
            UserStore,
            zustand,

            Components,
        };
    }
}
