"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});


function EssentialzTab() {
  return (
    <FormSection tag="h1" title="Essentialz Settings">
      <Card className="essentialz-card" outline={true}>
        <Text variant="text-md/normal">
          Welcome to the Essentialz settings page. Here you can configure your preferences.
        </Text>
        {/* Add more settings and controls here using Discord's components */}
      </Card>
    </FormSection>
  );
}

class Essentialz {
  constructor(userPreferences) {
    this.userPreferences = userPreferences;
    this.WebpackModules = null; // Initialize as null

    Nekocord.webpackPatcher.onInitializationFinish(() => {
      this.WebpackModules = Nekocord.webpackModules;
      this.initializeModules(); // Call a method to initialize modules
    });
  }

  initializeModules() {
    if (!this.WebpackModules) {
      console.error("WebpackModules is not initialized.");
      return;
    }

    const {
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
    } = this.WebpackModules; // Ensure this is correctly set

    // Use the destructured modules as needed
  }

  info = {
    name: "Essentialz",
    id: "arcane:Essentialz",
    authors: [{
      name: "Arcane",
      id: "808802000224518264"
    }],
    description: "Minor tweaks that make discord better!",
    version: "1.0.0",
    patches: [],
    preferences: [
      {
        name: "ArcaneTweaks",
        description: "CSS Tweaks called ArcaneTweaks",
        id: "ArcaneTweaks",
        type: "boolean",
        default: true
      },
    ]
  };
    settingsSections = [
      {
          header: "Essentialz",
          divider: true,
          settings: [
              "ESSENTIALZ",
          ],
      },
    ]
    settingsTabs = {
      ESSENTIALZ: {
          section: "Essentialz",
          searchableTitles: ["Essentialz"],
          label: "Essentialz",
          element: EssentialzTab, // Ensure this is correctly set
      }
    }
}

exports.default = Essentialz;