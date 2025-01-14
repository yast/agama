/*
 * Copyright (c) [2022-2024] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

import React from "react";
import { Text, TextContent, TextVariants } from "@patternfly/react-core";
import { deviceLabel } from "~/components/storage/utils";
import { Em } from "~/components/core";
import { _ } from "~/i18n";
import { useAvailableDevices, useProposalResult } from "~/queries/storage";
import { ProposalTarget } from "~/types/storage";

/**
 * Build a translated summary string for installing on an LVM with multiple
 * physical partitions/disks
 * @param policy - Find space policy
 * @returns Translated description
 */
const msgLvmMultipleDisks = (policy: string): string => {
  switch (policy) {
    case "resize":
      // TRANSLATORS: installing on an LVM with multiple physical partitions/disks
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group shrinking existing partitions at the underlying devices as needed",
      );
    case "keep":
      // TRANSLATORS: installing on an LVM with multiple physical partitions/disks
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group without modifying the partitions at the underlying devices",
      );
    case "delete":
      // TRANSLATORS: installing on an LVM with multiple physical partitions/disks
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group deleting all the content of the underlying devices",
      );
    case "custom":
      // TRANSLATORS: installing on an LVM with multiple physical partitions/disks
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group using a custom strategy to find the needed space at the underlying devices",
      );
  }
};

/**
 * Build a translated summary string for installing on an LVM with a single
 * physical partition/disk
 * @param policy - Find space policy
 * @returns Translated description with %s placeholder for the device
 * name
 */
const msgLvmSingleDisk = (policy: string): string => {
  switch (policy) {
    case "resize":
      // TRANSLATORS: installing on an LVM with a single physical partition/disk,
      // %s will be replaced by a device name and its size (eg. "/dev/sda, 20 GiB")
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group on %s shrinking existing partitions as needed",
      );
    case "keep":
      // TRANSLATORS: installing on an LVM with a single physical partition/disk,
      // %s will be replaced by a device name and its size (eg. "/dev/sda, 20 GiB")
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group on %s without modifying existing partitions",
      );
    case "delete":
      // TRANSLATORS: installing on an LVM with a single physical partition/disk,
      // %s will be replaced by a device name and its size (eg. "/dev/sda, 20 GiB")
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group on %s deleting all its content",
      );
    case "custom":
      // TRANSLATORS: installing on an LVM with a single physical partition/disk,
      // %s will be replaced by a device name and its size (eg. "/dev/sda, 20 GiB")
      return _(
        "Install in a new Logical Volume Manager (LVM) volume group on %s using a custom strategy to find the needed space",
      );
  }
};

const Content = ({ children }) => (
  <TextContent>
    <Text component={TextVariants.h3}>{_("Storage")}</Text>
    {children}
  </TextContent>
);

/**
 * Text explaining the storage proposal
 *
 * FIXME: this needs to be basically rewritten. See
 * https://github.com/openSUSE/agama/discussions/778#discussioncomment-7715244
 *
 * @param {object} props
 * @param {Proposal} props.proposal
 */
export default function StorageSection() {
  const availableDevices = useAvailableDevices();
  const result = useProposalResult();

  if (result === undefined) {
    return (
      <Content>
        <Text>{_("Install using an advanced configuration.")}</Text>
      </Content>
    );
  }

  const label = (deviceName) => {
    const device = availableDevices.find((d) => d.name === deviceName);
    return device ? deviceLabel(device) : deviceName;
  };

  if (result.settings.target === ProposalTarget.NEW_LVM_VG) {
    const pvDevices = result.settings.targetPVDevices;

    if (pvDevices.length > 1) {
      return (
        <Content>
          <span>{msgLvmMultipleDisks(result.settings.spacePolicy)}</span>
        </Content>
      );
    } else {
      const [msg1, msg2] = msgLvmSingleDisk(result.settings.spacePolicy).split("%s");

      return (
        <Content>
          <Text>
            <span>{msg1}</span>
            <Em>{label(pvDevices[0])}</Em>
            <span>{msg2}</span>
          </Text>
        </Content>
      );
    }
  }

  const targetDevice = result.settings.targetDevice;
  if (!targetDevice) return <Text>{_("No device selected yet")}</Text>;

  const fullMsg = (policy: string): string => {
    switch (policy) {
      case "resize":
        // TRANSLATORS: %s will be replaced by the device name and its size,
        // example: "/dev/sda, 20 GiB"
        return _("Install using device %s shrinking existing partitions as needed");
      case "keep":
        // TRANSLATORS: %s will be replaced by the device name and its size,
        // example: "/dev/sda, 20 GiB"
        return _("Install using device %s without modifying existing partitions");
      case "delete":
        // TRANSLATORS: %s will be replaced by the device name and its size,
        // example: "/dev/sda, 20 GiB"
        return _("Install using device %s and deleting all its content");
    }

    // TRANSLATORS: %s will be replaced by the device name and its size,
    // example: "/dev/sda, 20 GiB"
    return _("Install using device %s with a custom strategy to find the needed space");
  };

  const [msg1, msg2] = fullMsg(result.settings.spacePolicy).split("%s");

  return (
    <Content>
      <Text>
        {msg1}
        <Em>{label(targetDevice)}</Em>
        {msg2}
      </Text>
    </Content>
  );
}
