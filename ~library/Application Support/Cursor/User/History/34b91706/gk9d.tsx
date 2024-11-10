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

import { Localization } from "../../../../api/Localization";
import {
    Button,
    Card,
    ConfirmModal,
    Flex,
    FormSection,
    FormSwitch,
    FormText,
    FormTitle,
    Heading,
    ModalAPI,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalRoot,
    ModalSize,
    Parser,
    React,
    Text,
    TextInput,
    ToastAPI,
    useRef,
    useState,
} from "../../../../webpack/WebpackModules";
import "./NekocordTab.css";

const DISABLE_SECURITY_WARNING = `
# WARNING: You probably don't want to do this!
Althought disabling security allows you to install unverified plugins, there should be **no reason** for you to do so!
The nekocord team already approves all plugins that aren't malware (the bare minimum), so if someone is asking you to disable security to install their plugin, **there's a high chance you're being scammed**.

Not only does disabling security expose you to potentially malicious content, you will also **lose access to all support** while security is disabled.

If you're a developer, you should be using a dev build.

If you're absolutely sure you want to disable security and you know what you are doing, please enter "This is dangerous!" (case-sensitive).
`;

import { Tooltip, Icon } from "../../../../webpack/WebpackModules"; // Import Tooltip and Icon components
export function NekocordTab(props: { className: string; showHeader: boolean }) {
    const ref = useRef();
    const nekocordPlugin = Nekocord.pluginManager.plugins.get(
        "nekohaxx:nekocord",
    ) as any;
    // const { width, height } = useContainerDimensions(ref);
    const [updateAvailable, setUpdateAvailable] = useState(
        nekocordPlugin.instance.updateAvailable,
    );
    const [needsReload, setNeedsReload] = useState(
        nekocordPlugin.instance.needsReload,
    );
    const [nekocordBranch, setNekocordBranch] = useState(
        nekocordPlugin.instance.updateBranchName,
    );
    const [checkingForUpdates, setCheckingForUpdates] = useState(false);
    const [updating, setUpdating] = useState(false);

    function checkForUpdates() {
        setCheckingForUpdates(true);
        nekocordPlugin.instance
            .checkForUpdates()
            .then((result: boolean) => {
                setCheckingForUpdates(false);
                setUpdateAvailable(result);
                ToastAPI.showToast(
                    ToastAPI.createToast(
                        result
                            ? "An update is available! Please update as soon as possible."
                            : "Already up to date!",
                        ToastAPI.ToastType.MESSAGE,
                    ),
                );
            })
            .catch((e: Error) => {
                setCheckingForUpdates(false);
                ToastAPI.showToast(
                    ToastAPI.createToast(
                        "Failed to check for updates: " + e.message,
                        ToastAPI.ToastType.FAILURE,
                    ),
                );
            });
    }

    async function update() {
        setUpdating(true);
        try {
            const success = await NekocordNative.nekocord.update(
                nekocordPlugin.instance.updateBranchName,
            );
            setUpdating(false);
            if (!success) {
                throw new Error("unknown");
            }
            ToastAPI.showToast(
                ToastAPI.createToast(
                    Localization.Messages.UPDATE_SUCCESS_RELOAD,
                    ToastAPI.ToastType.SUCCESS,
                ),
            );
            setNeedsReload(true);
            nekocordPlugin.instance.needsReload = true;
        } catch (e) {
            setUpdating(false);
            ToastAPI.showToast(
                ToastAPI.createToast(
                    "Failed to update nekocord: " + e.message,
                    ToastAPI.ToastType.FAILURE,
                ),
            );
        }
    }

    const [disableSecurity, setDisableSecurity] = useState(
        Nekocord.pluginManager.plugins.get("nekohaxx:nekocord").userPreferences
            .disable_security || false,
    );

    function setDSecurity(value: boolean) {
        NekocordNative.preferences.setForPlugin(
            "nekohaxx:nekocord",
            "disable_security",
            value,
        );
        nekocordPlugin.userPreferences.disable_security = value;
        nekocordPlugin.instance.onPreferencesChange?.(
            nekocordPlugin.userPreferences,
        );
        setDisableSecurity(value);
    }

    function toggleSecurity() {
        if (disableSecurity) {
            setDSecurity(false);
            return;
        }
        ModalAPI.openModalLazy(async () => {
            return modalProps => {
                function Wrapper() {
                    const [text, setText] = useState("");
                    return (
                        <>
                            <ModalHeader separator={false}>
                                <Flex.Child grow={1} shrink={1} basis="auto">
                                    <Heading variant="heading-lg/semibold">
                                        {Localization.Messages.DISABLE_SECURITY}
                                    </Heading>
                                </Flex.Child>
                                <Flex.Child grow={0}>
                                    <ModalCloseButton
                                        onClick={modalProps.onClose}
                                    />
                                </Flex.Child>
                            </ModalHeader>
                            <ModalContent>
                                <FormSection>
                                    <FormText>
                                        <Text
                                            variant="text-md/normal"
                                            className="nk-markup">
                                            {Parser.parse(
                                                DISABLE_SECURITY_WARNING,
                                                false,
                                                {
                                                    allowHeading: true,
                                                },
                                            )}
                                        </Text>
                                    </FormText>
                                    <TextInput
                                        className="nk-margin-top-8 nk-margin-bottom-20"
                                        placeholder="Type in the sentence..."
                                        autoFocus={true}
                                        onChange={value => {
                                            setText(value);
                                        }}
                                    />
                                </FormSection>
                            </ModalContent>
                            <ModalFooter>
                                <Button
                                    disabled={text != "This is dangerous!"}
                                    look={Button.Looks.OUTLINED}
                                    color={Button.Colors.RED}
                                    onClick={() => {
                                        modalProps.onClose();
                                        setDSecurity(true);
                                    }}>
                                    {Localization.Messages.DISABLE_SECURITY}
                                </Button>
                                <Button
                                    className="nk-cancel-button"
                                    color={Button.Colors.PRIMARY}
                                    look={Button.Looks.LINK}
                                    onClick={modalProps.onClose}>
                                    {Localization.Messages.CANCEL}
                                </Button>
                            </ModalFooter>
                        </>
                    );
                }
                return (
                    <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
                        <Wrapper />
                    </ModalRoot>
                );
            };
        });
    }

    function changeBranch() {
        ModalAPI.openModalLazy(async () => {
            return modalProps => {
                function Wrapper() {
                    const [text, setText] = useState(nekocordBranch);
                    return (
                        <>
                            <ModalHeader separator={false}>
                                <Heading variant="heading-lg/semibold">
                                    {
                                        Localization.Messages
                                            .CHANGE_NEKOCORD_BRANCH
                                    }
                                </Heading>
                            </ModalHeader>
                            <ModalContent>
                                <FormTitle>
                                    {Localization.Messages.BRANCH}
                                </FormTitle>
                                <TextInput
                                    value={text}
                                    onChange={setText}
                                    autoFocus={true}
                                    placeholder="main"
                                />
                            </ModalContent>
                            <ModalFooter>
                                <Button
                                    onClick={() => {
                                        setNekocordBranch(text);
                                        nekocordPlugin.instance.updateBranchName =
                                            text;
                                        modalProps.onClose();
                                    }}>
                                    {Localization.Messages.UPDATE}
                                </Button>
                                <Button
                                    disabled={
                                        !/^[a-z0-9._-]{1,32}$/i.test(text)
                                    }
                                    className="nk-cancel-button"
                                    color={Button.Colors.PRIMARY}
                                    look={Button.Looks.LINK}
                                    onClick={modalProps.onClose}>
                                    {Localization.Messages.CANCEL}
                                </Button>
                            </ModalFooter>
                        </>
                    );
                }
                return (
                    <ModalRoot {...modalProps}>
                        <Wrapper />
                    </ModalRoot>
                );
            };
        });
    }

    return (
        <div className={props.className ?? ""}>
            <div ref={ref}>
                <FormSection
                    tag="h1"
                    title={Localization.Messages.NEKOCORD_SETTINGS}>
                    <Card
                        className={[
                            "nk-nekocord-card",
                            "nk-margin-bottom-20",
                        ].join(" ")}
                        outline={true}>
                        <Flex direction={Flex.Direction.HORIZONTAL}>
                            <Flex.Child grow={0}>
                                <img
                                    className="nk-logo"
                                    src="https://nekocord.dev/assets/nekocord_logo.webp"
                                />
                            </Flex.Child>
                            <Flex.Child grow={1}>
                                <div className="nk-nekocord-card-right">
                                    <img
                                        className="nk-logo-wordmark nk-margin-bottom-8"
                                        src="https://nekocord.dev/assets/nekocord_wordmark.webp"
                                    />
                                    <Text variant="text-md/normal">
                                        by nekohaxx and contributors &gt;w&lt;
                                        <br />
                                        <br />
                                    </Text>
                                    <Text variant="text-md/normal">
                                        Version {__NEKOCORD_VERSION__}, built{" "}
                                        {new Date(
                                            __BUILD_DATE__,
                                        ).toLocaleString()}
                                        .<br />
                                        {IS_DEV
                                            ? "Development"
                                            : "Release"}{" "}
                                        Build
                                    </Text>
                                </div>
                            </Flex.Child>
                        </Flex>
                    </Card>
                    <Card
                        className={[
                            "nk-nekocord-card",
                            "nk-margin-bottom-20",
                        ].join(" ")}
                        outline={true}>
                        <Flex direction={Flex.Direction.HORIZONTAL}>
                            <Flex.Child grow={1}>
                                <FormSection title={"Support the Project"}>
                                    <Text variant="text-md/normal">
                                        Please consider supporting the
                                        development of nekocord by donating!
                                        Your support helps keep the project
                                        alive and allows us to continue
                                        developing new features and
                                        improvements.
                                    </Text>
                                    <Text
                                        variant="text-md/normal"
                                        className="nk-markup">
                                        <a
                                            href="https://github.com/sponsors/nekohaxx"
                                            target="_blank"
                                            rel="noreferrer">
                                            Donate
                                        </a>
                                    </Text>
                                </FormSection>
                            </Flex.Child>
                            <Flex.Child grow={0}>
                                <img src="https://media.discordapp.net/stickers/1290175483467661362.gif?size=128&quality=lossless" />
                            </Flex.Child>
                        </Flex>
                    </Card>
                    <FormSection
                        title={
                            needsReload
                                ? Localization.Messages
                                      .NEKOCORD_UPDATER_NEEDS_RESTART
                                : updateAvailable
                                  ? Localization.Messages
                                        .NEKOCORD_UPDATER_UPDATE_AVAILABLE
                                  : Localization.Messages.NEKOCORD_UPDATER
                        }>
                        <Card
                            className={[
                                "nk-nekocord-card",
                                "nk-margin-bottom-20",
                            ].join(" ")}
                            outline={true}
                            type={
                                updateAvailable
                                    ? Card.Types.WARNING
                                    : Card.Types.PRIMARY
                            }>
                            <Flex direction={Flex.Direction.HORIZONTAL}>
                                {!updateAvailable && (
                                    <Tooltip text="Check for updates">
                                        <Button
                                            disabled={checkingForUpdates}
                                            onClick={() => checkForUpdates()}
                                            className="nk-button-bar-button nk-pretty-button">
                                            <Icon name="sync" />
                                            {checkingForUpdates
                                                ? Localization.Messages
                                                      .CHECKING_FOR_UPDATES
                                                : Localization.Messages
                                                      .CHECK_FOR_UPDATES}
                                        </Button>
                                    </Tooltip>
                                )}
                                {updateAvailable && !needsReload && (
                                    <Tooltip text="Update now">
                                        <Button
                                            disabled={updating}
                                            onClick={() => update()}
                                            className="nk-button-bar-button nk-pretty-button">
                                            <Icon name="download" />
                                            {updating
                                                ? Localization.Messages.UPDATING
                                                : Localization.Messages.UPDATE_NOW}
                                        </Button>
                                    </Tooltip>
                                )}
                                {needsReload && (
                                    <Tooltip text="Reload the application">
                                        <Button
                                            onClick={() =>
                                                DiscordNative.app.relaunch()
                                            }
                                            className="nk-button-bar-button nk-pretty-button">
                                            <Icon name="refresh" />
                                            {Localization.Messages.RELOAD}
                                        </Button>
                                    </Tooltip>
                                )}
                                <Tooltip text="View the changelog">
                                    <Button
                                        color={Button.Colors.PRIMARY}
                                        className="nk-button-bar-button nk-pretty-button">
                                        <Icon name="list" />
                                        {Localization.Messages.VIEW_CHANGELOG}
                                    </Button>
                                </Tooltip>
                                <Tooltip text="Change update branch">
                                    <Button
                                        color={Button.Colors.PRIMARY}
                                        className="nk-button-bar-button nk-pretty-button"
                                        onClick={() => changeBranch()}>
                                        <Icon name="branch" />
                                        {Localization.Messages.UPDATE_FROM_BRANCH.replace(
                                            "{branch}",
                                            nekocordBranch,
                                        )}
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Card>
                    </FormSection>
                    <FormSection title={Localization.Messages.QUICK_ACTIONS}>
                        <Card
                            className={[
                                "nk-nekocord-card",
                                "nk-margin-bottom-20",
                            ].join(" ")}
                            outline={true}
                            type={Card.Types.PRIMARY}>
                            <Flex direction={Flex.Direction.HORIZONTAL}>
                                <Tooltip text="Reload without Nekocord">
                                    <Button
                                        color={Button.Colors.PRIMARY}
                                        className="nk-button-bar-button nk-pretty-button"
                                        onClick={() => {
                                            ModalAPI.openModalLazy(async () => {
                                                return modalProps => {
                                                    return (
                                                        <ConfirmModal
                                                            confirmButtonColor={
                                                                Button.Colors.RED
                                                            }
                                                            {...modalProps}
                                                            header={
                                                                Localization
                                                                    .Messages
                                                                    .RELOAD_WITHOUT_NEKOCORD
                                                            }
                                                            confirmText={
                                                                                Localization
                                                                    .Messages.RELOAD
                                                            }
                                                            cancelText={
                                                                Localization
                                                                    .Messages.CANCEL
                                                            }
                                                            onConfirm={() => {
                                                                localStorage.setItem(
                                                                    "NEKOCORD_DISABLE_ONCE",
                                                                    "1",
                                                                );
                                                                location.reload();
                                                            }}>
                                                            <Text variant="text-md/normal">
                                                                {
                                                                    Localization
                                                                        .Messages
                                                                        .RELOAD_WITHOUT_NEKOCORD_INFO
                                                                }
                                                            </Text>
                                                        </ConfirmModal>
                                                    );
                                                };
                                            });
                                        }}>
                                        <Icon name="power-off" />
                                        {
                                            Localization.Messages
                                                .RELOAD_WITHOUT_NEKOCORD
                                        }
                                    </Button>
                                </Tooltip>
                                <div style={{ margin: "0 10px" }}></div>
                                <Tooltip text="Relaunch the client">
                                    <Button
                                        color={Button.Colors.PRIMARY}
                                        className="nk-button-bar-button nk-pretty-button"
                                        onClick={() => {
                                            ModalAPI.openModalLazy(async () => {
                                                return modalProps => {
                                                    return (
                                                        <ConfirmModal
                                                            confirmButtonColor={
                                                                Button.Colors.RED
                                                            }
                                                            {...modalProps}
                                                            header={
                                                                Localization
                                                                    .Messages
                                                                    .RELAUNCH_CLIENT
                                                            }
                                                            confirmText={
                                                                Localization
                                                                    .Messages
                                                                    .RELAUNCH
                                                            }
                                                            cancelText={
                                                                Localization
                                                                    .Messages.CANCEL
                                                            }
                                                            onConfirm={() => {
                                                                DiscordNative.app.relaunch();
                                                            }}>
                                                            <Text variant="text-md/normal">
                                                                {
                                                                    Localization
                                                                        .Messages
                                                                        .RELAUNCH_CLIENT
                                                                }
                                                            </Text>
                                                        </ConfirmModal>
                                                    );
                                                };
                                            });
                                        }}>
                                        <Icon name="redo" />
                                        {Localization.Messages.RELAUNCH_CLIENT}
                                    </Button>
                                </Tooltip>
                                <div style={{ margin: "0 10px" }}></div>
                                <Tooltip text="Enter safe mode">
                                    <Button
                                        color={Button.Colors.PRIMARY}
                                        className="nk-button-bar-button nk-pretty-button"
                                        onClick={() => {
                                            ModalAPI.openModalLazy(async () => {
                                                return modalProps => {
                                                    return (
                                                        <ConfirmModal
                                                            confirmButtonColor={
                                                                Button.Colors.RED
                                                            }
                                                            {...modalProps}
                                                            header={
                                                                Localization
                                                                    .Messages
                                                                    .ENTER_SAFE_MODE
                                                            }
                                                            confirmText={
                                                                Localization
                                                                    .Messages
                                                                    .ENTER_SAFE_MODE
                                                            }
                                                            cancelText={
                                                                Localization
                                                                    .Messages.CANCEL
                                                            }
                                                            onConfirm={() => {
                                                                localStorage.setItem(
                                                                    "NEKOCORD_SAFE_MODE",
                                                                    "1",
                                                                );
                                                                location.reload();
                                                            }}>
                                                            <Text variant="text-md/normal">
                                                                {
                                                                    Localization
                                                                        .Messages
                                                                        .ENTER_SAFE_MODE_INFO
                                                                }
                                                            </Text>
                                                        </ConfirmModal>
                                                    );
                                                };
                                            });
                                        }}>
                                        <Icon name="shield-alt" />
                                        {Localization.Messages.ENTER_SAFE_MODE}
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Card>
                    </FormSection>
                    <FormSection title={Localization.Messages.SETTINGS}>
                        <FormSwitch
                            note={Localization.Messages.DISABLE_SECURITY_NOTE}
                            hideBorder={true}
                            value={disableSecurity}
                            onChange={() => {
                                toggleSecurity();
                            }}>
                            {Localization.Messages.DISABLE_SECURITY}
                        </FormSwitch>
                    </FormSection>
                </FormSection>
            </div>
        </div>
    );
}
