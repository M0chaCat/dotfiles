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

import { useContainerDimensions } from "../../../../util/hooks";
import { Button, Card, ChannelChatResizableSidebar, ChatSidebarType, ConfirmModal, Flex, FormNotice, FormSection, FormSwitch, FormText, Heading, HeadingLevel, ModalAPI, React, Text, ToastAPI, useRef, useState } from "../../../../webpack/WebpackModules";
import './NekocordTab.css';

export function NekocordTab(props: { className: string, showHeader: boolean }) {
    let ref = useRef();
    const nekocordPlugin = Nekocord.pluginManager.plugins.get("nekohaxx:nekocord").instance as any;
    const { width, height } = useContainerDimensions(ref);
    const [updateAvailable, setUpdateAvailable] = useState(nekocordPlugin.updateAvailable);
    const [needsReload, setNeedsReload] = useState(nekocordPlugin.needsReload);
    const [checkingForUpdates, setCheckingForUpdates] = useState(false);
    const [updating, setUpdating] = useState(false);


    function checkForUpdates() {
        setCheckingForUpdates(true);
        nekocordPlugin.checkForUpdates().then((result: boolean) => {
            setCheckingForUpdates(false);
            setUpdateAvailable(result);
            ToastAPI.showToast(
                ToastAPI.createToast(result ? "An update is available! Please update as soon as possible." : "Already up to date!", ToastAPI.ToastType.MESSAGE)
            );
        }).catch((e: Error) => {
            setCheckingForUpdates(false);
            ToastAPI.showToast(
                ToastAPI.createToast("Failed to check for updates: " + e.message, ToastAPI.ToastType.FAILURE)
            );
        });
    }

    async function update() {
        setUpdating(true);
        try {
            var success = await NekocordNative.nekocord.update();
            setUpdating(false);
            if (!success) {
                throw new Error("unknown");
            }
            ToastAPI.showToast(
                ToastAPI.createToast("nekocord has been updated successfully! Please reload apply the update.", ToastAPI.ToastType.SUCCESS)
            );
            setNeedsReload(true);
            nekocordPlugin.needsReload = true;
        } catch (e) {
            setUpdating(false);
            ToastAPI.showToast(
                ToastAPI.createToast("Failed to update nekocord: " + e.message, ToastAPI.ToastType.FAILURE)
            );
        }
    }

    return (
        <div>
            <div ref={ref}>
                <FormSection tag="h1" title="nekocord Settings">
                    <Card className={["nk-nekocord-card", "nk-margin-bottom-20"].join(" ")} outline={true}>
                        <Flex direction={Flex.Direction.HORIZONTAL}>
                            <Flex.Child grow={0}>
                                <img className="nk-logo" src="https://nekocord.dev/assets/nekocord_logo.webp" />
                            </Flex.Child>
                            <Flex.Child grow={1}>
                                <div className="nk-nekocord-card-right">
                                    <img className="nk-logo-wordmark nk-margin-bottom-8" src="https://nekocord.dev/assets/nekocord_wordmark.webp" />
                                    <Text variant="text-md/normal">by nekohaxx and contributors &gt;w&lt;<br /><br /></Text>
                                    <Text variant="text-md/normal">Version {__NEKOCORD_VERSION__}, built {new Date(__BUILD_DATE__).toLocaleString()}.<br />{IS_DEV ? "Development" : "Release"} Build</Text>
                                </div>
                            </Flex.Child>
                        </Flex>
                    </Card>
                    <FormSection title={needsReload ? "Please reload to apply the update!" : (updateAvailable ? "A nekocord update is available!" : "nekocord Updater")}>
                        <Card className={["nk-nekocord-card", "nk-margin-bottom-20"].join(" ")} outline={true} type={updateAvailable ? Card.Types.WARNING : Card.Types.PRIMARY}>
                            <Flex direction={Flex.Direction.HORIZONTAL}>
                                { !updateAvailable && <Button disabled={checkingForUpdates} onClick={() => checkForUpdates()}>{checkingForUpdates ? "Checking for Updates..." : "Check for Updates"}</Button> }
                                { updateAvailable && !needsReload && <Button disabled={updating} onClick={() => update()}>{updating ? "Updating..." : "Update Now!"}</Button> }
                                { needsReload && <Button onClick={() => location.reload()}>Reload</Button> }
                                <Button color={Button.Colors.PRIMARY} className="nk-button-bar-button">View Changelog</Button>
                            </Flex>
                        </Card>
                    </FormSection>
                    <FormSection title="Quick Actions">
                        <Card className={["nk-nekocord-card", "nk-margin-bottom-20"].join(" ")} outline={true} type={updateAvailable ? Card.Types.WARNING : Card.Types.PRIMARY}>
                            <Flex direction={Flex.Direction.HORIZONTAL}>
                                <Button color={Button.Colors.PRIMARY} onClick={() => {
                                    ModalAPI.openModalLazy(async () => {
                                        return modalProps => {
                                            return <ConfirmModal confirmButtonColor={Button.Colors.RED} {...modalProps} header="Reload without nekocord" confirmText="Reload" cancelText="Cancel" onConfirm={() => {
                                                localStorage.setItem("NEKOCORD_DISABLE_ONCE", "1");
                                                location.reload();
                                            }}>
                                                <Text variant="text-md/normal">This will temporarily disable nekocord and any plugins. Reload again to re-enable nekocord.</Text>
                                            </ConfirmModal>
                                        }
                                    });
                                }}>Reload without nekocord</Button>
                                <div style={{ margin: '0 10px' }}></div> {}
                                <Button color={Button.Colors.PRIMARY} onClick={() => {
                                    ModalAPI.openModalLazy(async () => {
                                        return modalProps => {
                                            return <ConfirmModal confirmButtonColor={Button.Colors.RED} {...modalProps} header="Reload" confirmText="Reload" cancelText="Cancel" onConfirm={() => {
                                                location.reload();
                                            }}>
                                                <Text variant="text-md/normal">Reloads Discord and nekocord</Text>
                                            </ConfirmModal>
                                        }
                                    });
                                }}>Reload</Button>
                            </Flex>
                        </Card>
                    </FormSection>
                    <FormSection title="Settings">
                        <FormSwitch note={"Allows you to install third-party plugins, load external themes, etc. Doing so may harm your privacy and expose you to malicious content!"} hideBorder={true} value={false} onChange={(value) => {
                            
                        }}>Disable Security</FormSwitch>
                    </FormSection>
                </FormSection>
            </div>
        </div>
    );
}
