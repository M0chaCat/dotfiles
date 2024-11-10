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

import {
    Button,
    Card,
    ConfirmModal,
    Flex,
    FormSection,
    FormSwitch,
    FormText,
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

export function NekocordTab(props: { className: string; showHeader: boolean }) {
    const ref = useRef();
    const nekocordPlugin = Nekocord.pluginManager.plugins.get(
        "nekohaxx:nekocord",
    ) as any;
    const [updateAvailable, setUpdateAvailable] = useState(
        nekocordPlugin.instance.updateAvailable,
    );
    const [needsReload, setNeedsReload] = useState(nekocordPlugin.instance.needsReload);
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
            const success = await NekocordNative.nekocord.update();
            setUpdating(false);
            if (!success) {
                throw new Error("unknown");
            }
            ToastAPI.showToast(
                ToastAPI.createToast(
                    "nekocord has been updated successfully! Please reload apply the update.",
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

    const [disableSecurity, setDisableSecurity] = useState(Nekocord.pluginManager.plugins.get("nekohaxx:nekocord").userPreferences.disable_security || false);

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
                        <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
                            <ModalHeader separator={false}>
                                <Flex.Child grow={1} shrink={1} basis="auto">
                                    <Heading variant="heading-lg/semibold">
                                        Disable Security
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
                                        onChange={(value) => {
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
                                    Disable Security
                                </Button>
                                <Button
                                    className="nk-cancel-button"
                                    color={Button.Colors.PRIMARY}
                                    look={Button.Looks.LINK}
                                    onClick={modalProps.onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalRoot>
                    );
                }
                return (
                    <Wrapper />
                );
            };
        });
    }

    return (
        <div className={`nekocord-tab ${props.className ?? ""}`}>
            <div ref={ref}>
                <FormSection tag="h1" title="Nekocord Settings">
                    <Card className="nk-nekocord-card nk-margin-bottom-20" outline={true}>
                        <Flex direction={Flex.Direction.HORIZONTAL}>
                            <Flex.Child grow={0}>
                                <img className="nk-logo" src="https://nekocord.dev/assets/nekocord_logo.webp" />
                            </Flex.Child>
                            <Flex.Child grow={1}>
                                <div className="nk-nekocord-card-right">
                                    <img className="nk-logo-wordmark nk-margin-bottom-8" src="https://nekocord.dev/assets/nekocord_wordmark.webp" />
                                    <Text variant="text-md/normal">
                                        by nekohaxx and contributors &gt;w&lt;
                                        <br /><br />
                                    </Text>
                                    <Text variant="text-md/normal">
                                        Version {__NEKOCORD_VERSION__}, built {new Date(__BUILD_DATE__).toLocaleString()}.
                                        <br />
                                        {IS_DEV ? "Development" : "Release"} Build
                                    </Text>
                                </div>
                            </Flex.Child>
                        </Flex>
                    </Card>
                    <FormSection title={needsReload ? "Please reload to apply the update!" : updateAvailable ? "A nekocord update is available!" : "Nekocord Updater"}>
                        <Card className="nk-nekocord-card nk-margin-bottom-20" outline={true} type={updateAvailable ? Card.Types.WARNING : Card.Types.PRIMARY}>
                            <Flex direction={Flex.Direction.HORIZONTAL} justify={Flex.Justify.SPACE_BETWEEN}>
                                <Button disabled={checkingForUpdates} onClick={checkForUpdates}>
                                    {checkingForUpdates ? "Checking for Updates..." : "dont Check for Updates"}
                                </Button>
                                {updateAvailable && !needsReload && (
                                    <Button disabled={updating} onClick={update}>
                                        {updating ? "Updating..." : "Update Now!"}
                                    </Button>
                                )}
                                {needsReload && (
                                    <Button onClick={() => location.reload()}>
                                        Reload
                                    </Button>
                                )}
                                <Button color={Button.Colors.PRIMARY} className="nk-button-bar-button">
                                    View Changelog
                                </Button>
                            </Flex>
                        </Card>
                    </FormSection>
                    <FormSection title="Quick Actions">
                        <Card className="nk-nekocord-card nk-margin-bottom-20" outline={true}>
                            <Flex direction={Flex.Direction.HORIZONTAL} justify={Flex.Justify.SPACE_BETWEEN}>
                                <Button color={Button.Colors.PRIMARY} onClick={() => openReloadModal("Reload without nekocord")}>
                                    Reload without nekocord
                                </Button>
                                <Button color={Button.Colors.PRIMARY} onClick={() => openReloadModal("Reload")}>
                                    Reload
                                </Button>
                            </Flex>
                        </Card>
                    </FormSection>
                    <FormSection title="Settings">
                        <FormSwitch
                            note="Allows you to install unverified third-party plugins. Doing so may harm your privacy and expose you to malicious content!"
                            hideBorder={true}
                            value={disableSecurity}
                            onChange={toggleSecurity}>
                            Disable Security
                        </FormSwitch>
                    </FormSection>
                </FormSection>
            </div>
        </div>
    );
}

// Helper function to open reload modals
function openReloadModal(header: string) {
    ModalAPI.openModalLazy(async () => {
        return modalProps => (
            <ConfirmModal
                confirmButtonColor={Button.Colors.RED}
                {...modalProps}
                header={header}
                confirmText="Reload"
                cancelText="Cancel"
                onConfirm={() => {
                    if (header === "Reload without nekocord") {
                        localStorage.setItem("NEKOCORD_DISABLE_ONCE", "1");
                    }
                    location.reload();
                }}>
                <Text variant="text-md/normal">
                    {header === "Reload without nekocord"
                        ? "This will temporarily disable nekocord and any plugins. Reload again to re-enable nekocord."
                        : "Reloads Discord and nekocord"}
                </Text>
            </ConfirmModal>
        );
    });
}
